import { useEffect, useRef, useState, useCallback } from 'react'
import type { ChatSocketResponse } from '@/types/chat'

export const useChatSocket = (chatroomId: number, ticket: string | null, onEvent: (response: ChatSocketResponse) => void) => {
  const socketRef = useRef<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const connect = useCallback(() => {
    if (!ticket || !chatroomId) return

    const socket = new WebSocket(`${process.env.NEXT_PUBLIC_CHAT_SOCKET_DOMAIN}?chatTicket=${ticket}`)

    socket.onopen = () => {
      setIsConnected(true)
      pingIntervalRef.current = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: 'PING' }))
        }
      }, 30000)
    }

    socket.onmessage = (event) => {
      const response: ChatSocketResponse = JSON.parse(event.data)
      onEvent(response)
    }

    socket.onclose = (event) => {
      console.log(`WS Disconnected (Code: ${event.code})`)
      setIsConnected(false)
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current)
      socketRef.current = null
    }

    socketRef.current = socket
  }, [ticket, chatroomId, onEvent])

  const sendMessage = useCallback((content: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: 'TALK',
          content: content,
        }),
      )
    }
  }, [])

  useEffect(() => {
    connect()
    return () => {
      socketRef.current?.close()
    }
  }, [connect])

  return { isConnected, sendMessage }
}
