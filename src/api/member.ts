import { MemberSocreDto } from '@/types/dto/member.dto'
import { fetchWrapper } from '@/utils/fetchWrapper'

// 회원 운동점수 조회
export function readMemberScore(token: string): Promise<MemberSocreDto> {
  return fetchWrapper<MemberSocreDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/members/score`,
    {
      method: 'GET',
    },
    token,
  )
}
