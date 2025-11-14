'use client'

import { AuthProvider } from 'react-oidc-context'

import { ToastProvider } from '@/context/toastContext'
import { ChatAlertProvider } from '@/context/chatAlertContext'
import { Toast } from '@/components/commons/toast'
import ChatAlert from '@/components/commons/chatAlert'
import { userManager } from '@/lib/auth'
import ServiceWorkerRegister from '@/lib/serviceWorkerRegister'
import FcmListener from '@/lib/firebase/fcmListener'

import { SwrProvider } from './swrProvider'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider userManager={userManager}>
      <ToastProvider>
        <ChatAlertProvider>
          <SwrProvider>{children}</SwrProvider>
          <Toast />
          <ChatAlert />
          <ServiceWorkerRegister />
          <FcmListener />
        </ChatAlertProvider>
      </ToastProvider>
    </AuthProvider>
  )
}
