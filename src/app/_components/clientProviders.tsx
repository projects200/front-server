'use client'
import { AuthProvider } from 'react-oidc-context'

import { userManager } from '@/lib/auth'
import { ToastProvider } from '@/context/toastContext'
import { Toast } from '@/components/commons/toast'

import AuthGuard from './authGuard'

export const ClientProviders = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <AuthProvider userManager={userManager}>
      <AuthGuard>
        <ToastProvider>
          {children}
          <Toast />
        </ToastProvider>
      </AuthGuard>
    </AuthProvider>
  )
}
