'use client'

// import Script from 'next/script'
import { AuthProvider } from 'react-oidc-context'

import { ToastProvider } from '@/context/toastContext'
import { Toast } from '@/components/commons/toast'
import { userManager } from '@/lib/auth'
import ServiceWorkerRegister from '@/lib/serviceWorkerRegister'

import { SwrProvider } from './swrProvider'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  // const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services,clusterer&autoload=false`

  return (
    <AuthProvider userManager={userManager}>
      <ToastProvider>
        {/* <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" /> */}
        <SwrProvider>{children}</SwrProvider>
        <Toast />
        <ServiceWorkerRegister />
      </ToastProvider>
    </AuthProvider>
  )
}
