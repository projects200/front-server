import { ChatRoomId, ChatRoom, ChatList, ChatId, NewChat } from '@/types/chat'
import { fetchWrapper } from '@/utils/fetchWrapper'

// 채팅방 생성
export function createChatRoom(
  token: string,
  data: { receiverId: string },
): Promise<ChatRoomId> {
  return fetchWrapper<ChatRoomId>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/chat-rooms`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    token,
  )
}

// 내 채팅방 목록 조회
export function readChatRoomList(token: string): Promise<ChatRoom[]> {
  return fetchWrapper<ChatRoom[]>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/chat-rooms`,
    {
      method: 'GET',
    },
    token,
  )
}

// 특정 채팅방 메시지 목록 조회
export function readChatMessages(
  token: string,
  chatroomId: number,
  prevChatId?: number,
): Promise<ChatList> {
  const params = new URLSearchParams()
  if (prevChatId) {
    params.append('prevChatId', String(prevChatId))
  }
  params.append('size', '30')

  return fetchWrapper<ChatList>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/chat-rooms/${chatroomId}/messages?${params.toString()}`,
    {
      method: 'GET',
    },
    token,
  )
}

// 메시지 생성
export function createChatMessage(
  token: string,
  chatroomId: number,
  data: { content: string },
): Promise<ChatId> {
  return fetchWrapper<ChatId>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/chat-rooms/${chatroomId}/messages`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    token,
  )
}

// 새 메시지 목록 조회
export function readNewChatMessages(
  token: string,
  chatroomId: number,
): Promise<NewChat> {
  return fetchWrapper<NewChat>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/chat-rooms/${chatroomId}/messages/new`,
    {
      method: 'GET',
    },
    token,
  )
}

// 채팅방 나가기
export function deleteChatRoom(
  token: string,
  chatroomId: number,
): Promise<void> {
  return fetchWrapper<void>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/chat-rooms/${chatroomId}`,
    {
      method: 'DELETE',
    },
    token,
  )
}
