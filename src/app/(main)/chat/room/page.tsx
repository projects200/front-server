'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from 'react-oidc-context'

import Header from '@/components/commons/header'
import KebabIcon from '@/assets/icon_kebab.svg'
import { isSameMinute } from '@/utils/dataFormatting'
import { useReadChatMessages, useDeleteChatRoom, useGetChatTicket } from '@/hooks/api/useChatApi'
import { useChatSocket } from '@/hooks/useChatSocket'
import type { ChatContent, SocketChatContent } from '@/types/chat'
import type { ChatSocketResponse } from '@/types/chat'
import { logAnalyticsEvent } from '@/lib/firebase/analytics'

import KebabModal from './_components/kebabModal'
import MyMessage from './_components/myMessage'
import OtherMessage from './_components/otherMessage'
import SystemMessage from './_components/systemMessage'
import FloatingDate from './_components/floatingDate'
import ChatInput from './_components/chatInput'
import styles from './room.module.css'

export default function ChatRoom() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const chatRoomId = Number(searchParams.get('chatRoomId'))
  const nickName = searchParams.get('nickName')
  const memberId = searchParams.get('memberId')

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [visibleDate, setVisibleDate] = useState<string | null>(null)
  const [isDateVisible, setIsDateVisible] = useState(false)
  const [ticket, setTicket] = useState<string | null>(null)
  const [isOtherUserLeft, setIsOtherUserLeft] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const messageContainerRef = useRef<HTMLDivElement>(null)
  const messageEndRef = useRef<HTMLDivElement>(null)
  const prevScrollHeightRef = useRef<number | null>(null)

  const { messages, hasNextPage, opponentActive, blockActive, setSize, mutate, isFetchingPrevMessages } = useReadChatMessages(chatRoomId)
  const { trigger: getTicket } = useGetChatTicket()
  const { trigger: leaveChatRoom } = useDeleteChatRoom(chatRoomId)

  // 초기 API 로드 시 상대방 활성화/차단 상태 동기화
  useEffect(() => {
    setIsOtherUserLeft(!opponentActive)
    setIsBlocked(blockActive)
  }, [opponentActive, blockActive])

  // 티켓 발급
  useEffect(() => {
    const fetchTicket = async () => {
      if (!chatRoomId) return
      try {
        const res = await getTicket({ chatroomId: chatRoomId })
        setTicket(res.data.chatTicket)
      } catch (err) {
        console.error('티켓 발급 실패:', err)
      }
    }
    fetchTicket()
  }, [chatRoomId, getTicket])

  const handleSocketEvent = useCallback(
    (response: ChatSocketResponse) => {
      const { type, data, message } = response

      if (type === 'TALK' && data) {
        const socketData = data as SocketChatContent
        // const isMine = socketData.senderId === user?.profile?.sub

        // if (!isMine && isOtherUserLeft) {
        //   setIsOtherUserLeft(false)
        //   setIsBlocked(false)
        // }

        mutate((currentData) => {
          if (!currentData) return []

          const newData = [...currentData]
          const isDuplicate = newData.some((page) => page.content.some((chat) => chat.chatId === socketData.chatId))

          if (isDuplicate) return currentData

          const newChatEntry: ChatContent = {
            ...socketData,
            mine: socketData.senderId === user?.profile?.sub,
          }

          newData[0] = {
            ...newData[0],
            content: [...newData[0].content, newChatEntry],
          }
          return newData
        }, false)
      }

      if (message === null) return

      if (type === 'SYSTEM_LEAVE') {
        setIsOtherUserLeft(true)

        mutate((currentData) => {
          if (!currentData) return []
          const newData = [...currentData]

          const systemEntry: ChatContent = {
            chatId: Date.now(),
            chatContent: message,
            sentAt: new Date().toISOString(),
            mine: false,
            chatType: 'SYSTEM',
            senderId: '',
            senderNickname: '',
            senderProfileUrl: '',
            senderThumbnailUrl: '',
          }

          newData[0] = { ...newData[0], content: [...newData[0].content, systemEntry] }
          return newData
        }, false)
        return
      }

      if (type === 'SYSTEM_BANNED') {
        setIsBlocked(true)
        return
      }

      if (type === 'ERROR') {
        console.log(message || '메시지 전송에 실패했습니다.')
      }
    },
    [mutate, user?.profile?.sub],
  )

  // 웹소켓 연결
  const { sendMessage: sendMessageBySocket } = useChatSocket(chatRoomId, ticket, handleSocketEvent)

  // 메세지 전송 핸들러

  const handleSendMessage = (message: string) => {
    if (!message.trim() || !user?.profile) return
    sendMessageBySocket(message)
    logAnalyticsEvent('chat_sent', {
      screen_name: 'chat_room',
      event_category: 'engagement',
      event_label: 'chat_message',
    })

    // 추후 응답속도가 느려 낙관적 업데이트가 필요할 시 재사용
    // const tempMessage: ChatContent = {
    //   chatId: Date.now(),
    //   chatContent: message,
    //   sentAt: new Date().toISOString(),
    //   mine: true,
    //   chatType: 'USER',
    //   senderId: user.profile.sub,
    //   senderNickname: '',
    //   senderProfileUrl: '',
    //   senderThumbnailUrl: '',
    // }
    // mutate((currentData) => {
    //   if (!currentData) return []
    //   const newData = [...currentData]
    //   newData[0] = {
    //     ...newData[0],
    //     content: [...newData[0].content, tempMessage],
    //   }
    //   return newData
    // }, false)
  }

  // 채팅방 나가기 핸들러
  const handleLeaveChat = async () => {
    try {
      await leaveChatRoom()
      router.back()
    } catch {}
  }

  // 스크롤시 이벤트 핸들러
  const handleScroll = useCallback(async () => {
    const container = messageContainerRef.current
    if (!container) return

    // 스크롤 시 날짜 표시 로직
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    const messageElements = container.querySelectorAll('[data-date]')

    for (const element of messageElements) {
      const rect = element.getBoundingClientRect()
      if (rect.top >= container.getBoundingClientRect().top) {
        const date = (element as HTMLElement).dataset.date
        if (date) {
          setVisibleDate(date)
          break
        }
      }
    }

    setIsDateVisible(true)
    scrollTimeoutRef.current = setTimeout(() => {
      setIsDateVisible(false)
    }, 500)

    // 스크롤 상단 도달 시 이전 메시지 로드 로직
    if (container.scrollTop === 0 && hasNextPage && !isFetchingPrevMessages) {
      prevScrollHeightRef.current = container.scrollHeight
      setSize((prevSize) => prevSize + 1)
    }
  }, [hasNextPage, isFetchingPrevMessages, setSize])

  // 컴포넌트 언마운트시 타이머 정리
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    const container = messageContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll])

  // 새 메시지 수신 시 하단 스크롤 유지
  useEffect(() => {
    const container = messageContainerRef.current
    if (!container) return

    if (prevScrollHeightRef.current !== null) {
      container.scrollTop = container.scrollHeight - prevScrollHeightRef.current
      prevScrollHeightRef.current = null
    } else {
      messageEndRef.current?.scrollIntoView()
    }
  }, [messages.length])

  const menuRef = (node: HTMLDivElement) => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!node.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }

  if (!chatRoomId || !nickName || !memberId) return null

  return (
    <div className={styles['container']}>
      {/* 헤더 영역 */}
      <Header
        right={
          <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <KebabIcon />
          </button>
        }
      >
        {nickName}
      </Header>

      {/* 채팅 내역 영역 */}
      <div className={styles['chat-area-wrapper']}>
        <FloatingDate date={visibleDate} isVisible={isDateVisible} />
        <div className={styles['message-container']} ref={messageContainerRef}>
          {messages.map((chat, index) => {
            const prevChat = index > 0 ? messages[index - 1] : null
            const nextChat = index < messages.length - 1 ? messages[index + 1] : null
            const isContinuous = !!(prevChat && prevChat.senderId === chat.senderId && prevChat.chatType === 'USER' && chat.chatType === 'USER' && isSameMinute(prevChat.sentAt, chat.sentAt))
            const shouldShowTime = !nextChat || nextChat.senderId !== chat.senderId || nextChat.chatType !== 'USER' || !isSameMinute(nextChat.sentAt, chat.sentAt)

            if (chat.chatType === 'SYSTEM') {
              return (
                <div key={chat.chatId} data-date={chat.sentAt}>
                  <SystemMessage content={chat.chatContent} />
                </div>
              )
            }

            return chat.mine ? (
              <div key={chat.chatId} data-date={chat.sentAt}>
                <MyMessage chat={chat} isContinuous={isContinuous} shouldShowTime={shouldShowTime} />
              </div>
            ) : (
              <div key={chat.chatId} data-date={chat.sentAt}>
                <OtherMessage chat={chat} isContinuous={isContinuous} shouldShowTime={shouldShowTime} memberId={memberId} />
              </div>
            )
          })}
          <div ref={messageEndRef} className={styles['message-end-ref']} />
        </div>
      </div>

      {/* 채팅 입력 영역 */}
      <ChatInput onSend={handleSendMessage} disabled={isOtherUserLeft} blocked={isBlocked} />

      {isMenuOpen && (
        <KebabModal
          ref={menuRef}
          onExit={() => {
            handleLeaveChat()
            setIsMenuOpen(false)
          }}
        />
      )}
    </div>
  )
}
