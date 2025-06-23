'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useReadRegistered } from '@/hooks/useAuthApi'
import SITE_MAP from '@/constants/siteMap.constant'

export default function CallbackHandler() {
  const router = useRouter()
  const { data } = useReadRegistered()

  useEffect(() => {
    if (!data) return

    if (data.isRegistered) {
      router.replace(SITE_MAP.EXERCISE)
    } else {
      router.replace(SITE_MAP.AGREEMENT)
    }
  }, [data])

  return null
}
