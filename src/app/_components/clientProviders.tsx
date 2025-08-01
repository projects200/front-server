'use client'

import { AuthProvider } from 'react-oidc-context'
import { ToastProvider } from '@/context/toastContext'
import { Toast } from '@/components/commons/toast'
import { userManager } from '@/lib/auth'
import { SwrProvider } from './swrProvider'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider userManager={userManager}>
      <ToastProvider>
        <SwrProvider>{children}</SwrProvider>
        <Toast />
      </ToastProvider>
    </AuthProvider>
  )
}
