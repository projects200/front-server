'use client'

import { useRouter } from 'next/navigation'
import { useToast } from './useToast'
import { ApiError } from '@/types/common'
import SITE_MAP from '@/constants/siteMap.constant'

export default function useApiErrorHandler() {
  const showToast = useToast()
  const router = useRouter()

  // 페이지 이동 여부를 반환
  return (err: unknown): boolean => {
    if (err instanceof ApiError) {
      if (err.status === 401) {
        showToast('인증이 만료되었습니다. 다시 로그인해주세요.', 'info')
        router.replace(SITE_MAP.LOGIN)
        return true
      } else {
        showToast(err.message, 'info')
      }
    } else if (err instanceof Error) {
      showToast(err.message, 'info')
    } else {
      showToast('알 수 없는 오류가 발생했습니다.', 'info')
    }
    return false
  }
}
