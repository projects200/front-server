'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { userManager } from '@/lib/auth'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    userManager.getUser().then((user) => {
      if (!user || user.expired) {
        router.push('/login')
      } else {
        router.replace('/temp')
      }
    })
  }, [])

  return <div></div>
}
