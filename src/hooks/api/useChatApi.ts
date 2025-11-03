import {
  createChatRoom,
  readChatRoomList,
  readChatMessages,
  createChatMessage,
  readNewChatMessages,
  deleteChatRoom,
} from '@/api/chat'
import {
  ChatRoomId,
  ChatRoom,
  ChatList,
  ChatId,
  NewChat,
  ChatContent,
} from '@/types/chat'
import {
  adapterChatRoomId,
  adapterChatRoomList,
  adapterChatList,
  adapterChatId,
  adapterNewChat,
} from '@/lib/adapters/chat.adapter'

import useApiGet from './useApiGet'
import useApiMutation from './useApiMutation'
import useApiGetInfinite from './useApiGetInfinite'

// 채팅방 생성
export const usePostChatRoom = () =>
  useApiMutation<ChatRoomId, { receiverId: string }>(
    ['chatRoom/list'],
    (token, body) => createChatRoom(token, body).then(adapterChatRoomId),
    {},
  )

// 내 채팅방 목록 조회
export const useReadChatRoomList = () =>
  useApiGet<ChatRoom[]>(
    ['chatRoom/list'],
    (token) => readChatRoomList(token).then(adapterChatRoomList),
    { refreshInterval: 15000 },
  )

// 특정 채팅방 메시지 목록 조회
export const useReadChatMessages = (chatroomId: number) => {
  const getKey: (
    pageIndex: number,
    previousPageData: ChatList | null,
  ) => [number, number | undefined] | null = (pageIndex, previousPageData) => {
    if (!chatroomId) return null

    if (pageIndex === 0) {
      return [chatroomId, undefined]
    }

    if (!previousPageData || !previousPageData.hasNext) {
      return null
    }

    const lastMessageId = previousPageData.content[0]?.chatId
    if (!lastMessageId) return null

    return [chatroomId, lastMessageId]
  }

  const { data, size, setSize, mutate, isValidating } = useApiGetInfinite<
    ChatList,
    [number, number | undefined]
  >(
    getKey,
    (token: string, reqChatroomId: number, reqPrevChatId?: number) =>
      readChatMessages(token, reqChatroomId, reqPrevChatId).then(
        adapterChatList,
      ),
    {
      revalidateFirstPage: false,
    },
  )

  const messages: ChatContent[] = data
    ? [...data].reverse().flatMap((page) => page.content)
    : []
  const isFetchingPrevMessages = isValidating && size > 1
  const hasNextPage = data?.at(-1)?.hasNext ?? true
  const opponentActive = data?.at(0)?.opponentActive ?? true
  const blockActive = data?.at(0)?.blockActive ?? false

  return {
    messages,
    isFetchingPrevMessages,
    hasNextPage,
    opponentActive,
    blockActive,
    setSize,
    mutate,
  }
}

// 메시지 생성
export const usePostChatMessage = (chatroomId: number) =>
  useApiMutation<ChatId, { content: string }>(
    [`chatRoom/messages`, chatroomId],
    (token, body) =>
      createChatMessage(token, chatroomId, body).then(adapterChatId),
    { revalidate: false },
  )

// 새 메시지 목록 조회
export const useReadNewChatMessages = (chatroomId: number) =>
  useApiGet<NewChat>(
    [`chatRoom/messages/new`, chatroomId],
    (token) => readNewChatMessages(token, chatroomId).then(adapterNewChat),
    {
      refreshInterval: (latestData) => {
        if (latestData?.blockActive || !latestData?.opponentActive) {
          return 0
        }
        return 2000
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      policy: {
        messages: {
          409: null,
        },
      },
    },
  )

// 채팅방 나가기
export const useDeleteChatRoom = (chatroomId: number) =>
  useApiMutation<void, void>(
    ['chatRoom/list'],
    (token) => deleteChatRoom(token, chatroomId),
    {},
  )
