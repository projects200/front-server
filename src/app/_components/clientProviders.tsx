'use client'
import { AuthProvider } from 'react-oidc-context'

import { userManager } from '@/lib/auth'
import { ToastProvider } from '@/context/toastContext'
import { Toast } from '@/components/commons/toast'

export const ClientProviders = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <AuthProvider userManager={userManager}>
      <ToastProvider>
        {children}
        <Toast />
      </ToastProvider>
    </AuthProvider>
  )
}
