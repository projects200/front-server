'use client'

import { Suspense } from 'react'
import CallbackClient from './_components/callbackClient'

export default function CallbackPage() {
  return (
    <Suspense>
      <CallbackClient />
    </Suspense>
  )
}
