import type { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import Script from 'next/script'

import Analytics from '@/lib/firebase/analytics'

import { ClientProviders } from './_components/clientProviders'
import './reset.css'
import './globals.css'

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: process.env.NEXT_PUBLIC_TITLE,
  description: '운동매칭 & 운동기록',
  icons: {
    apple: '/icons/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'dev'

  return (
    <html lang="ko">
      <head>
        {isDevelopment && <meta name="robots" content="noindex, nofollow" />}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#EBF1E5" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body>
        <ClientProviders>
          <NuqsAdapter>
            <div className="responsive-container">{children}</div>
            <div id="modal-root" />
          </NuqsAdapter>
        </ClientProviders>
        <Analytics />
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}
