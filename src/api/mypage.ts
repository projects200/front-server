import { fetchWrapper } from '@/utils/fetchWrapper'
import { UserProfile } from '@/types/mypage'
import { UserProfileDto, UserFullProfileDto } from '@/types/dto/mypage.dto'

// 유저 전체 프로필 조회
export function readUserFullProfile(
  token: string,
): Promise<UserFullProfileDto> {
  return fetchWrapper<UserFullProfileDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/profile`,
    { method: 'GET' },
    token,
  )
}

// 다른 유저 전체 프로필 조회
export function readOtherUserFullProfile(
  token: string,
  memberId: string,
): Promise<UserFullProfileDto> {
  return fetchWrapper<UserFullProfileDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/members/${memberId}/profile`,
    { method: 'GET' },
    token,
  )
}

// 유저 프로필 수정
export function updateUserProfile(
  token: string,
  data: UserProfile,
): Promise<UserProfileDto> {
  return fetchWrapper<UserProfileDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/profile`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
    },
    token,
  )
}
