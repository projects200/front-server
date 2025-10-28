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
    setSize,
    mutate,
    isFetchingPrevMessages,
  } = useReadChatMessages(chatRoomId)
  const { data: newMessagesData } = useReadNewChatMessages(chatRoomId)
  const { trigger: sendMessage } = usePostChatMessage(chatRoomId)
  const { trigger: leaveChatRoom } = useDeleteChatRoom(chatRoomId)
  const otherUserLeft = !opponentActive

  // 메세지 전송 핸들러
  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !user?.profile) return

    const tempMessage: ChatContent = {
      chatId: Date.now(),
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
      await sendMessage({ content: message })
      mutate()
    } catch {
      mutate()
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
      mutate()
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
                />
              </div>
            )
          })}
          <div ref={messageEndRef} className={styles['message-end-ref']} />
        </div>
      </div>

      {/* 채팅 입력 영역 */}
      <ChatInput onSend={handleSendMessage} disabled={otherUserLeft} />

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
