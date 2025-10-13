export type Message = {
  chatId: number
  senderId: string
  senderNickname: string
  senderProfileUrl: string | null
  senderThumbnailUrl: string | null
  chatContent: string
  chatType: string
  sentAt: string
  isMine: boolean
}
