import {
  createChatRoom,
  readChatRoomList,
  readChatMessages,
  createChatMessage,
  readNewChatMessages,
  deleteChatRoom,
} from '@/api/chat'
import { ChatRoomId, ChatRoom, ChatList, ChatId, NewChat } from '@/types/chat'
import {
  adapterChatRoomId,
  adapterChatRoomList,
  adapterChatList,
  adapterChatId,
  adapterNewChat,
} from '@/lib/adapters/chat.adapter'

import useApiGet from './useApiGet'
import useApiMutation from './useApiMutation'

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
    {},
  )

// 특정 채팅방 메시지 목록 조회
export const useReadChatMessages = (chatroomId: number) =>
  useApiGet<ChatList>(
    [`chatRoom/messages`, chatroomId],
    (token) => readChatMessages(token, chatroomId).then(adapterChatList),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

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
      refreshInterval: 2000,
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
