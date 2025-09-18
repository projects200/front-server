import useApiGet from './useApiGet'
import useApiMutation from './useApiMutation'

import { updateUserProfile, readUserFullProfile } from '@/api/mypage'
import { adapterUserFullProfile } from '@/lib/adapters/mypage.adapter'
import { UserProfile, UserFullProfile } from '@/types/mypage'
import { UserProfileDto } from '@/types/dto/mypage.dto'

// 유저 전체 프로필 조회
export const useReadUserFullProfile = () =>
  useApiGet<UserFullProfile>(
    ['mypage/fullProfile'],
    (token) => readUserFullProfile(token).then(adapterUserFullProfile),
    {
      revalidateOnFocus: true,
      revalidateOnMount: true,
    },
  )

// 유저 프로필 수정
export const usePutUserProfile = () =>
  useApiMutation<UserProfileDto, UserProfile>(
    ['mypage/fullProfile'],
    (token, body) => updateUserProfile(token, body),
    {},
  )
