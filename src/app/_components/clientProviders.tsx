'use client'

import { AuthProvider } from 'react-oidc-context'
import { User } from 'oidc-client-ts'
import { useRouter } from 'next/navigation'

import { ToastProvider } from '@/context/toastContext'
import { Toast } from '@/components/commons/toast'
import { userManager } from '@/lib/auth'
import ServiceWorkerRegister from '@/lib/serviceWorkerRegister'
import SITE_MAP from '@/constants/siteMap.constant'

import { SwrProvider } from './swrProvider'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const handleSigninCallback = async (user: User | void): Promise<void> => {
    if (user && !user.expired) {
      router.replace(SITE_MAP.VERIFICATION)
    } else {
      alert('로그인 정보가 만료되었습니다. 다시 로그인해주세요.')
      router.replace(SITE_MAP.LOGIN)
    }
  }
  return (
    <AuthProvider
      userManager={userManager}
      onSigninCallback={handleSigninCallback}
    >
      <ToastProvider>
        <SwrProvider>{children}</SwrProvider>
        <Toast />
        <ServiceWorkerRegister />
      </ToastProvider>
    </AuthProvider>
  )
}
