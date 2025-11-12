'use client'

import { useEffect } from 'react'
import { getMessaging, onMessage } from 'firebase/messaging'

import {
  ChatMessagePayload,
  useChatAlertContext,
} from '@/context/chatAlertContext'

import { firebaseApp } from './config'

function FcmListener() {
  const { showChatAlert } = useChatAlertContext()

  useEffect(() => {
    const messaging = getMessaging(firebaseApp)

    // onMessage 리스터 등록. 웹이 켜져 있을 때 메시지가 오면 해당 콜백이 실행됨
    const unsubscribe = onMessage(messaging, (payload) => {
      const chatRoomIdFromMessage = payload.data?.chatRoomId
      const searchParams = new URLSearchParams(window.location.search)
      const chatRoomIdFromUrl = searchParams.get('chatRoomId')

      // 현재 페이지가 알람받은 유저와의 채팅방이 아닌경우에만 알림을 띄움
      if (
        chatRoomIdFromMessage &&
        String(chatRoomIdFromMessage) !== chatRoomIdFromUrl
      ) {
        showChatAlert(payload as unknown as ChatMessagePayload)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return null
}

export default FcmListener
