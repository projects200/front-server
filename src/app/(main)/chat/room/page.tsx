'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from 'react-oidc-context'

import Header from '@/components/commons/header'
import KebabIcon from '@/assets/icon_kebab.svg'
import { isSameMinute } from '@/utils/dataFormatting'
import {
  usePostChatMessage,
  useReadChatMessages,
  useReadNewChatMessages,
  useDeleteChatRoom,
} from '@/hooks/api/useChatApi'
import { ChatContent } from '@/types/chat'

import KebabModal from './_components/kebabModal'
import MyMessage from './_components/myMessage'
import OtherMessage from './_components/otherMessage'
import SystemMessage from './_components/systemMessage'
import FloatingDate from './_components/floatingDate'
import ChatInput from './_components/chatInput'
import styles from './room.module.css'

export default function ChatRoom() {
  // Hooks
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  // URL 파라미터에서 채팅방 정보 추출
  const chatRoomId = Number(searchParams.get('chatRoomId'))
  const nickName = searchParams.get('nickName')
  const memberId = searchParams.get('memberId')

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [visibleDate, setVisibleDate] = useState<string | null>(null)
  const [isDateVisible, setIsDateVisible] = useState(false)

  // Refs
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const messageContainerRef = useRef<HTMLDivElement>(null)
  const messageEndRef = useRef<HTMLDivElement>(null)
  const prevScrollHeightRef = useRef<number | null>(null)

  // API Hooks
  const {
    messages,
    hasNextPage,
    opponentActive,
    blockActive,
    setSize,
    mutate,
    isFetchingPrevMessages,
  } = useReadChatMessages(chatRoomId)
  const { data: newMessagesData } = useReadNewChatMessages(chatRoomId)
  const { trigger: sendMessage } = usePostChatMessage(chatRoomId)
  const { trigger: leaveChatRoom } = useDeleteChatRoom(chatRoomId)
  const otherUserLeft = !opponentActive
  const isBlockActive = blockActive || newMessagesData?.blockActive || false

  // 메세지 전송 핸들러
  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !user?.profile) return

    const tempChatId = Date.now()
    const tempMessage: ChatContent = {
      chatId: tempChatId,
      chatContent: message,
      sentAt: new Date().toISOString(),
      mine: true,
      chatType: 'USER',
      senderId: user.profile.sub,
      senderNickname: '',
      senderProfileUrl: '',
      senderThumbnailUrl: '',
    }
    mutate((currentData) => {
      if (!currentData) return []
      const newData = [...currentData]
      newData[0] = {
        ...newData[0],
        content: [...newData[0].content, tempMessage],
      }
      return newData
    }, false)

    try {
      const response = await sendMessage({ content: message })
      const realChatId = response.data.chatId
      mutate((currentData) => {
        if (!currentData) return []

        const newData = currentData.map((page) => ({
          ...page,
          content: [...page.content],
        }))

        const pageWithTempMessage = newData.find((page) =>
          page.content.some((chat) => chat.chatId === tempChatId),
        )

        if (pageWithTempMessage) {
          const messageToUpdate = pageWithTempMessage.content.find(
            (chat) => chat.chatId === tempChatId,
          )
          if (messageToUpdate) {
            messageToUpdate.chatId = realChatId
          }
        }

        return newData
      }, false)
    } catch {
      mutate((currentData) => {
        if (!currentData) return []
        const newData = currentData.map((page) => ({
          ...page,
          content: page.content.filter((chat) => chat.chatId !== tempChatId),
        }))
        return newData
      }, false)
    }
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

  // 새로운 메시지에 대한 처리 로직
  useEffect(() => {
    if (newMessagesData && newMessagesData.newChats.length > 0) {
      mutate((currentData) => {
        if (!currentData) return []

        const newData = currentData.map((page) => ({
          ...page,
          content: [...page.content],
        }))

        // 새로운 메시지들을 최신 페이지(0번 인덱스)에 추가합니다.
        // 중복 추가를 방지하기 위해 이미 캐시에 없는 메시지만 추가합니다.
        const existingChatIds = new Set(newData[0].content.map((c) => c.chatId))
        const chatsToAdd = newMessagesData.newChats.filter(
          (newChat) => !existingChatIds.has(newChat.chatId),
        )

        if (chatsToAdd.length > 0) {
          // newChats 배열은 시간 역순일 수 있으므로 올바른 순서로 정렬 후 추가
          chatsToAdd.sort(
            (a, b) =>
              new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
          )
          newData[0].content.push(...chatsToAdd)
        }

        return newData
      }, false) // revalidate: false
    }
  }, [newMessagesData, mutate])

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

  // 스크롤 위치 조정 로직
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
        rightIcon={<KebabIcon />}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {nickName}
      </Header>

      {/* 채팅 내역 영역 */}
      <div className={styles['chat-area-wrapper']}>
        <FloatingDate date={visibleDate} isVisible={isDateVisible} />
        <div className={styles['message-container']} ref={messageContainerRef}>
          {messages.map((chat, index) => {
            const prevChat = index > 0 ? messages[index - 1] : null
            const nextChat =
              index < messages.length - 1 ? messages[index + 1] : null

            const isContinuous = !!(
              prevChat &&
              prevChat.senderId === chat.senderId &&
              prevChat.chatType === 'USER' &&
              chat.chatType === 'USER' &&
              isSameMinute(prevChat.sentAt, chat.sentAt)
            )

            const shouldShowTime =
              !nextChat ||
              nextChat.senderId !== chat.senderId ||
              nextChat.chatType !== 'USER' ||
              !isSameMinute(nextChat.sentAt, chat.sentAt)

            if (chat.chatType === 'SYSTEM') {
              return (
                <div key={chat.chatId} data-date={chat.sentAt}>
                  <SystemMessage content={chat.chatContent} />
                </div>
              )
            }

            return chat.mine ? (
              <div key={chat.chatId} data-date={chat.sentAt}>
                <MyMessage
                  chat={chat}
                  isContinuous={isContinuous}
                  shouldShowTime={shouldShowTime}
                />
              </div>
            ) : (
              <div key={chat.chatId} data-date={chat.sentAt}>
                <OtherMessage
                  chat={chat}
                  isContinuous={isContinuous}
                  shouldShowTime={shouldShowTime}
                  memberId={memberId}
                />
              </div>
            )
          })}
          <div ref={messageEndRef} className={styles['message-end-ref']} />
        </div>
      </div>

      {/* 채팅 입력 영역 */}
      <ChatInput
        onSend={handleSendMessage}
        disabled={otherUserLeft}
        blocked={isBlockActive}
      />

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
