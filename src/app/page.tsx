'use client'

import AuthGuard from '@/app/_components/authGuard'

export default function Home() {
  return <AuthGuard>임시 / 경로 페이지입니다.</AuthGuard>
}
