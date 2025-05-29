import type { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { GoogleTagManager } from '@next/third-parties/google'

import { ClientProviders } from './_components/clientProviders'

import './reset.css'
import './globals.css'

export const metadata: Metadata = {
  title: '운다방',
  description: '운동매칭 & 운동기록',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <html lang="ko">
      <head></head>
      <GoogleTagManager gtmId={gtmId!} />
      <body>
        <ClientProviders>
          <NuqsAdapter>
            <div className="responsive-container">{children}</div>
            <div id="modal-root" />
          </NuqsAdapter>
        </ClientProviders>
      </body>
    </html>
  )
}
