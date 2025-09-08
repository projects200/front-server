'use client'

import { useQueryState } from 'nuqs'
import { useAuth } from 'react-oidc-context'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import LoadingScreen from '@/components/commons/loadingScreen'
import { useToast } from '@/hooks/useToast'
import SITE_MAP from '@/constants/siteMap.constant'

export default function Callback() {
  const auth = useAuth()
  const router = useRouter()
  const showToast = useToast()
  const [errorDescription] = useQueryState('error_description')
  const hasHandledAccountLink = useRef(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || hasHandledAccountLink.current) return

    if (
      errorDescription &&
      errorDescription.includes('ACCOUNT_LINKED_SUCCESS')
    ) {
      hasHandledAccountLink.current = true
      auth.removeUser()
      showToast(
        '기존의 계정과 성공적으로 통합되었습니다.\n다시 로그인해주세요.',
        'info',
      )
      router.replace(SITE_MAP.LOGIN)
      return
    }
  }, [isMounted, errorDescription, auth, router])

  return <LoadingScreen />
}
