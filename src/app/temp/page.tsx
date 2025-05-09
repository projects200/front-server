'use client'

import { signOutRedirect } from '@/lib/auth'
export default function Temp() {
  const handleSignOut = async () => {
    await signOutRedirect()
  }
  return (
    <div>
      <div>임시 메인 페이지</div>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  )
}
