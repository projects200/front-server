'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { userManager } from '@/lib/auth'
import { checkRegister } from '@/lib/checkRegister'
import SITE_MAP from '@/constants/siteMap.constant'

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await userManager.signinRedirectCallback()
        const isRegistered = await checkRegister()
        if (isRegistered === true) {
          router.replace(SITE_MAP.TEMP1)
        } else if (isRegistered === false) {
          router.replace(SITE_MAP.AGREEMENT)
        } else {
          router.replace(SITE_MAP.LOGIN)
        }
      } catch (error) {
        console.error('Error in signinRedirectCallback:', error)
        router.replace(SITE_MAP.LOGIN)
      }
    }
    handleCallback()
  }, [])

  return null
}
