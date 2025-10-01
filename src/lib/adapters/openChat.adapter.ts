import { ChatroomUrl } from '@/types/openChat'
import { ChatroomUrlDto } from '@/types/dto/openChat.dto'

export function adapterChatroomUrl(dto: ChatroomUrlDto): ChatroomUrl {
  return {
    chatroomUrl: dto.openChatroomUrl,
  }
}

export function adapterChatroomUrlToDto(data: ChatroomUrl): ChatroomUrlDto {
  return {
    openChatroomUrl: data.chatroomUrl,
  }
}
