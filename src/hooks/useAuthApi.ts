import { Key } from 'swr'
import { createUser, readRegistered } from '@/api/auth'
import { SignUp, MemberInfo } from '@/types/auth'
import SITE_MAP from '@/constants/siteMap.constant'

import useApiGet from './useApiGet'
import useApiMutation from './useApiMutation'

// 유저 생성
export const usePostUser = () =>
  useApiMutation<MemberInfo, SignUp>(
    ['auth/create'],
    createUser,
    {},
    { messages: { 400: '입력값이 올바르지 않습니다.' } },
    false,
  )

// 유저 회원가입 여부 확인
export const useReadRegistered = (key: Key) =>
  useApiGet<{ isRegistered: boolean }>(
    key,
    readRegistered,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
      shouldRetryOnError: false,
      revalidateIfStale: false,
      dedupingInterval: 1000 * 60 * 60,
    },

    { actions: { 400: { type: 'redirect', to: SITE_MAP.LOGIN } } },
    false,
  )
