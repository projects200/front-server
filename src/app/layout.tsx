import type { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
// import { GoogleTagManager } from '@next/third-parties/google'

import { ClientProviders } from './_components/clientProviders'

import './reset.css'
import './globals.css'
import Script from 'next/script'

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

  return (
    <html lang="ko">
      <head>
        {gtmId && (
          <Script
            id="gtm-base"
            strategy="afterInteractive"
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
        )}
      </head>
      <body>
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
        )}
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
