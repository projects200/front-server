import { ChatroomUrl } from '@/types/openChat'
import { ChatroomUrlDto } from '@/types/dto/openChat.dto'
import { adapterChatroomUrlToDto } from '@/lib/adapters/openChat.adapter'
import { fetchWrapper } from '@/utils/fetchWrapper'

// 오픈 채팅 URL 생성
export function createChatroomUrl(
  token: string,
  data: ChatroomUrl,
): Promise<{ openChatroomId: number }> {
  const dto: ChatroomUrlDto = adapterChatroomUrlToDto(data)
  return fetchWrapper<{ openChatroomId: number }>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/open-chats`,
    {
      method: 'POST',
      body: JSON.stringify(dto),
    },
    token,
  )
}

// 나의 오픈 채팅 URL 조회
export function readChatroomUrl(token: string): Promise<ChatroomUrlDto> {
  return fetchWrapper<ChatroomUrlDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/open-chat`,
    {
      method: 'GET',
    },
    token,
  )
}

// 다른회원 오픈 채팅 URL 조회
export function readMemberChatroomUrl(
  token: string,
  memberId: string,
): Promise<ChatroomUrlDto> {
  return fetchWrapper<ChatroomUrlDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/members/${memberId}/open-chat`,
    {
      method: 'GET',
    },
    token,
  )
}
