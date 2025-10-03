import { ChatroomUrl, Chatroom } from '@/types/openChat'
import { ChatroomUrlDto, ChatroomDto } from '@/types/dto/openChat.dto'

export function adapterChatroomUrl(dto: ChatroomUrlDto): ChatroomUrl {
  return {
    chatroomUrl: dto.openChatroomUrl,
  }
}

export function adapterChatroom(dto: ChatroomDto): Chatroom {
  return {
    chatroomId: dto.openChatroomId,
    chatroomUrl: dto.openChatroomUrl,
  }
}

export function adapterChatroomUrlToDto(data: ChatroomUrl): ChatroomUrlDto {
  return {
    openChatroomUrl: data.chatroomUrl,
  }
}
