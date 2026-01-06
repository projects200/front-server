import { useEffect, useRef, useState, useCallback } from 'react'
import type { SocketChatContent } from '@/types/chat'

type WebSocketMessage = {
  webSocketType: 'TALK' | 'PING' | 'PONG'
  data?: SocketChatContent | null
}

export const useChatSocket = (
  chatroomId: number,
  ticket: string | null,
  onMessageReceived: (message: SocketChatContent) => void,
) => {
  const socketRef = useRef<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const connect = useCallback(() => {
    if (!ticket || !chatroomId) return

    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_CHAT_SOCKET_DOMAIN}?chatTicket=${ticket}`,
    )

    socket.onopen = () => {
      setIsConnected(true)
      pingIntervalRef.current = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ webSocketType: 'PING' }))
        }
      }, 30000)
    }

    socket.onmessage = (event) => {
      const response: WebSocketMessage = JSON.parse(event.data)
      if (response.webSocketType === 'TALK' && response.data) {
        onMessageReceived(response.data)
      }
    }

    socket.onclose = (event) => {
      console.log(
        `WS Disconnected (Code: ${event.code}, Reason: ${event.reason})`,
      )
      setIsConnected(false)
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current)
      socketRef.current = null
    }

    socketRef.current = socket
  }, [ticket, chatroomId, onMessageReceived])

  const sendMessage = useCallback((content: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          webSocketType: 'TALK',
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
