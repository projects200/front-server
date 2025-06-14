import { useRouter } from 'next/navigation'
import { useToast } from './useToast'
import { ApiError } from '@/types/common'
import SITE_MAP from '@/constants/siteMap.constant'
import { ErrorPolicy } from '@/types/common'

const defaultMessages: Record<number, string> = {
  401: '인증이 만료되었습니다. 다시 로그인해주세요.',
}
const defaultActions: Partial<Record<number, 'back' | { type: 'redirect'; to: string }>> = {
  401: { type: 'redirect', to: SITE_MAP.LOGIN },
}

export function useApiErrorHandler() {
  const showToast = useToast()
  const router = useRouter()

  return (error: unknown, policy?: ErrorPolicy) => {
    const status = error instanceof ApiError ? error.status : error instanceof Error ? 500 : 0
    console.log(status)
    // 메세지
    const message = policy?.messages?.[status] ?? defaultMessages[status] ?? '알 수 없는 오류가 발생했습니다.'
    showToast(message, 'info')

    // 액션
    const action = policy?.actions?.[status] ?? defaultActions[status]
    if (action === 'back') {
      router.back()
    } else if (action && typeof action === 'object' && action.type === 'redirect') {
      router.replace(action.to)
    }
  }
}
