export type ChatRoomId = {
  chatRoomId: number
}

export type ChatRoom = ChatRoomId & {
  otherMemberId:string
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
}

export type NewChat = {
  newChats: ChatContent[]
  opponentActive: boolean
}
