'use client'

import { useEffect } from 'react'
import { userManager } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function CallbackPage() {
  const router = useRouter()
  useEffect(() => {
    userManager
      .signinRedirectCallback()
      .then((user) => {
        
        // router.push('/')
      })
      .catch((error) => {
        console.error('Error in callback handling:', error)
      })
  }, [])

  return <div></div>
}
