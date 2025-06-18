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

const nonce = process.env.NEXT_PUBLIC_CSP_NONCE

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: http: 'unsafe-inline';
    connect-src 'self' https://*.undabang.store https://*.googletagmanager.com https://*.google-analytics.com https://*.clarity.ms https://*.amazonaws.com https://auth.undabang.store;
    img-src 'self' data: blob: https://*.undabang.store https://*.googletagmanager.com https://*.google-analytics.com https://*.clarity.ms https://*.amazonaws.com;
    object-src 'none';
    base-uri 'self';
  `
    .replace(/\s{2,}/g, ' ')
    .trim()

  return (
    <html lang="ko" nonce={nonce}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
      </head>
      <GoogleTagManager gtmId={gtmId!} nonce={nonce} />

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
