import type { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
// import { GoogleTagManager } from '@next/third-parties/google'

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
  const nonce = process.env.NEXT_PUBLIC_CSP_NONCE
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  console.log(nonce)
  console.log(gtmId)

  return (
    <html lang="ko" nonce={nonce}>
      <head nonce={nonce}></head>
      {/* <Script
        id="gtm-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
        nonce={nonce}
      /> */}
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
