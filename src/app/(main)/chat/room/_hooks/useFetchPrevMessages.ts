import { useState, useCallback } from 'react'
import { useAuth } from 'react-oidc-context'

import { readChatMessages } from '@/api/chat'
import { adapterChatList } from '@/lib/adapters/chat.adapter'
import { ChatList } from '@/types/chat'

export const useFetchPrevMessages = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const execute = useCallback(
    async (chatroomId: number, prevChatId: number): Promise<ChatList> => {
      setIsLoading(true)
      try {
        const token = user?.access_token
        if (!token) throw new Error('No access token available')

        const prevMessagesDto = await readChatMessages(
          token,
          chatroomId,
          prevChatId,
        )
        return adapterChatList(prevMessagesDto)
      } catch (error) {
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [user?.access_token],
  )

  return { isLoading, execute }
}
