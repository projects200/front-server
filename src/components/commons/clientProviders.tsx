'use client'

import { ToastProvider } from '@/context/toastContext'
import { Toast } from './toast'

export const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastProvider>
      {children}
      <Toast />
    </ToastProvider>
  )
}