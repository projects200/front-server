import {
  updateUserProfile,
  readOtherUserFullProfile,
  readUserFullProfile,
} from '@/api/mypage'
import { adapterUserFullProfile } from '@/lib/adapters/mypage.adapter'
import { UserProfile, UserFullProfile } from '@/types/mypage'
import { UserProfileDto } from '@/types/dto/mypage.dto'

import useApiGet from './useApiGet'
import useApiMutation from './useApiMutation'

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

// 다른 유저 전체 프로필 조회
export const useReadOtherUserFullProfile = (memberId: string) =>
  useApiGet<UserFullProfile>(
    ['mypage/other/fullProfile'],
    (token) =>
      readOtherUserFullProfile(token, memberId).then(adapterUserFullProfile),
    {
      policy: {
        messages: {
          400: '자신의 운동장소 입니다.',
        },
        actions: { 400: 'back' },
      },
    },
  )

// 유저 프로필 수정
export const usePutUserProfile = () =>
  useApiMutation<UserProfileDto, UserProfile>(
    ['mypage/fullProfile'],
    (token, body) => updateUserProfile(token, body),
    {},
  )
