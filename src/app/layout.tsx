import type { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Analytics } from '@/lib/firebase'

import { ClientProviders } from './_components/clientProviders'
import './reset.css'
import './globals.css'

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: '운다방',
  description: '운동매칭 & 운동기록',
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
        <meta name="theme-color" content="#4F7942" />
      </head>
      <body>
        <ClientProviders>
          <NuqsAdapter>
            <div className="responsive-container">{children}</div>
            <div id="modal-root" />
          </NuqsAdapter>
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  )
}
