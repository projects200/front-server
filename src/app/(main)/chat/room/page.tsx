'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

import Header from '@/components/commons/header'
import KebabIcon from '@/assets/icon_kebab.svg'
import { isSameMinute } from '@/utils/dataFormatting'

import KebabModal from './_components/kebabModal'
import MyMessage from './_components/myMessage'
import OtherMessage from './_components/otherMessage'
import SystemMessage from './_components/systemMessage'
import FloatingDate from './_components/floatingDate'
import ChatInput from './_components/chatInput'
import styles from './room.module.css'

import { tempData } from './tempData'

export default function ChatRoom() {
  const searchParams = useSearchParams()
  const chatRoomId = searchParams.get('chatRoomId')
  const nickName = searchParams.get('nickName')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messages, setMessages] = useState(tempData)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [otherUserLeft, setOtherUserLeft] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [visibleDate, setVisibleDate] = useState<string | null>(null)
  const [isDateVisible, setIsDateVisible] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const messageContainerRef = useRef<HTMLDivElement>(null)
  const messageEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = (message: string) => {
    // TODO: 메시지 전송 API 호출
    alert(message)
  }

  const handleLeaveChat = () => {
    // TODO: 채팅방 나가기 API 호출
    alert('채팅방에서 나갔습니다.')
  }

  // 스크롤 이벤트 핸들러(페이지 상단에 메세지 날짜 표시)
  const handleScroll = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    setIsDateVisible(true)

    const container = messageContainerRef.current
    if (!container) return

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

    scrollTimeoutRef.current = setTimeout(() => {
      setIsDateVisible(false)
    }, 500)
  }

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // TODO: 페이지 진입 시 메시지 목록 조회 API 호출하여 데이터 삽입

    const interval = setInterval(() => {
      // TODO: 2초마다 새로운 메시지 조회 API 폴링 setMessages() 사용
      // TODO: 시스템 메세지를 확인하여 상대방 퇴장 여부 설정 setOtherUserLeft() 사용
    }, 2000)

    return () => {
      clearInterval(interval)
      // TODO: 화면 이탈 시 마지막 메시지 저장 API 호출
    }
  }, [chatRoomId])

  useEffect(() => {
    const container = messageContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    messageEndRef.current?.scrollIntoView()
  }, [messages])

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
              chat.chatType === 'USER'
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

            return chat.isMine ? (
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
