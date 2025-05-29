'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import SITE_MAP from '@/constants/siteMap.constant'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace(SITE_MAP.TEMP1)
  }, [router])

  return null
}
