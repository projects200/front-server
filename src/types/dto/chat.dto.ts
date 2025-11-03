export type ChatRoomIdDto = {
  chatRoomId: number
}

export type ChatRoomDto = ChatRoomIdDto & {
  otherMemberId: string
  otherMemberNickname: string
  otherMemberProfileImageUrl: string
  otherMemberThumbnailImageUrl: string
  lastChatContent: string
  lastChatReceivedAt: string
  unreadCount: number
}

export type ChatIdDto = {
  chatId: number
}

export type ChatContentDto = ChatIdDto & {
  senderId: string
  senderNickname: string
  senderProfileUrl: string
  senderThumbnailUrl: string
  chatContent: string
  chatType: string
  sentAt: string
  mine: boolean
}

export type ChatListDto = {
  content: ChatContentDto[]
  hasNext: boolean
  opponentActive: boolean
  blockActive: boolean
}

export type NewChatDto = {
  newChats: ChatContentDto[]
  opponentActive: boolean
  blockActive: boolean
}
