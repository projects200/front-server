'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { userManager } from '@/lib/auth'
import { checkRegister } from '@/lib/checkRegister'

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await userManager.signinRedirectCallback()
        const isRegistered = await checkRegister()
        if (isRegistered === true) {
          router.replace('/temp')
        } else if (isRegistered === false) {
          router.replace('/agreement')
        } else {
          router.replace('/login')
        }
      } catch (error) {
        console.error('Error in signinRedirectCallback:', error)
        router.replace('/login')
      }
    }
    handleCallback()
  }, [])

  return null
}
