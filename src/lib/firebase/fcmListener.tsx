'use client'

import { useEffect, useRef } from 'react'
import { getMessaging, onMessage, Messaging } from 'firebase/messaging'

import {
  ChatMessagePayload,
  useChatAlertContext,
} from '@/context/chatAlertContext'

import { firebaseApp } from './config'

function FcmListener() {
  const { showChatAlert } = useChatAlertContext()
  const messagingRef = useRef<Messaging | null>(null)

  useEffect(() => {
    if (!messagingRef.current) {
      messagingRef.current = getMessaging(firebaseApp)
    }

    // onMessage 리스너 등록. 웹이 켜져 있을 때 메시지가 오면 해당 콜백이 실행됨
    const unsubscribe = onMessage(messagingRef.current, (payload) => {
      if (document.visibilityState === 'visible') {
        console.log(payload)
        const chatRoomIdFromMessage = payload.data?.chatroomId
        const searchParams = new URLSearchParams(window.location.search)
        const chatRoomIdFromUrl = searchParams.get('chatRoomId')

        // 현재 페이지가 알람받은 유저와의 채팅방이 아닌경우에만 알림을 띄움
        if (
          chatRoomIdFromMessage &&
          String(chatRoomIdFromMessage) !== chatRoomIdFromUrl
        ) {
          showChatAlert(payload as unknown as ChatMessagePayload)
        }
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return null
}

export default FcmListener
