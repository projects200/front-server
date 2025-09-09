import { fetchWrapper } from '@/utils/fetchWrapper'
import { UserFullProfileDto } from '@/types/dto/mypage'

// 유저 전체 프로필 저회
export function readUserFullProfile(token: string): Promise<UserFullProfileDto> {
  return fetchWrapper<UserFullProfileDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/profile`,
    { method: 'GET' },
    token,
  )
}
