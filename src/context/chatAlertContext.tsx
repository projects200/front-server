import { createContext, useContext, useState, ReactNode, useRef } from 'react'
import type { MessagePayload } from 'firebase/messaging'

type ChatAlertPayloadData = {
  chatRoomId: number
  memberId: string
  nickname: string
  content: string
}

// Firebase의 기본 payload 타입에서 data 부분만 커스텀 타입으로 재정의
export type ChatMessagePayload = Omit<MessagePayload, 'data'> & {
  data: ChatAlertPayloadData
}

type ChatAlertState = {
  id: string
  payload: ChatMessagePayload
  isVisible: boolean
}

type ChatAlertContextType = {
  chatAlert: ChatAlertState | null
  showChatAlert: (payload: ChatMessagePayload) => void
}

const ChatAlertContext = createContext<ChatAlertContextType | undefined>(
  undefined,
)

export const ChatAlertProvider = ({ children }: { children: ReactNode }) => {
  const [chatAlert, setChatAlert] = useState<ChatAlertState | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const showChatAlert = (payload: ChatMessagePayload) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const id = crypto.randomUUID()

    setChatAlert({ id, payload, isVisible: true })
    timeoutRef.current = setTimeout(closeAlert, 3000)
  }

  const closeAlert = () => {
    setChatAlert((prev) => (prev ? { ...prev, isVisible: false } : null))
    setTimeout(() => {
      setChatAlert(null)
    }, 300)
  }

  return (
    <ChatAlertContext.Provider value={{ chatAlert, showChatAlert }}>
      {children}
    </ChatAlertContext.Provider>
  )
}

export const useChatAlertContext = () => {
  const context = useContext(ChatAlertContext)
  if (!context) {
    throw new Error('useChatAlertContext must be used within ChatAlertProvider')
  }
  return context
}
