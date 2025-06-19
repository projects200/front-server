'use client'

import AuthGuard from '@/app/_components/authGuard'

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_CSP_NONCE)
  return <AuthGuard>1.0.0</AuthGuard>
}
