export type ChatroomUrlDto = {
  openChatroomUrl: string
}

export type ChatroomIdDto = {
  openChatroomId: number
}

export type ChatroomDto = ChatroomUrlDto & ChatroomIdDto
