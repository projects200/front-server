export type ChatRoomId = {
  chatRoomId: number
}

export type RequestChatRoom = {
  receiverId: string
  exerciseLocationId: number
  requesterLatitude: number
  requesterLongitude: number
}

export type ChatRoom = ChatRoomId & {
  otherMemberId: string
  otherMemberNickname: string
  otherMemberProfileImageUrl: string
  otherMemberThumbnailImageUrl: string
  lastChatContent: string
  lastChatReceivedAt: string
  unreadCount: number
}

export type ChatId = {
  chatId: number
}

export type ChatContent = ChatId & {
  senderId: string
  senderNickname: string
  senderProfileUrl: string
  senderThumbnailUrl: string
  chatContent: string
  chatType: string
  sentAt: string
  mine: boolean
}

export type ChatList = {
  content: ChatContent[]
  hasNext: boolean
  opponentActive: boolean
  blockActive: boolean
}

export type NewChat = {
  newChats: ChatContent[]
  opponentActive: boolean
  blockActive: boolean
}

export type SocketChatContent = ChatId & {
  senderId: string
  senderNickname: string
  senderProfileUrl: string
  senderThumbnailUrl: string
  chatContent: string
  chatType: string
  sentAt: string
}

export type ChatSocketResponse = {
  succeed: boolean
  type: 'TALK' | 'PONG' | 'ERROR' | 'SYSTEM_BANNED' | 'SYSTEM_LEAVE'
  message: string | null
  data: SocketChatContent | string | null
}