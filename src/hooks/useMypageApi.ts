import useApiGet from './useApiGet'
import { readUserFullProfile } from '@/api/mypage'
import { adapterUserFullProfile } from '@/lib/adapters/mypage.adapter'
import { UserFullProfile } from '@/types/mypage'

// 유저 전체 프로필 조회
export const useReadUserFullProfile = () =>
  useApiGet<UserFullProfile>(
    ['userFullProfile'],
    (token) => readUserFullProfile(token).then(adapterUserFullProfile),
    {},
  )
