import type { Metadata } from 'next'

import { GoogleTagManager } from '@next/third-parties/google'
import { AuthProvider } from '@/context/authContext'
import { ClientProviders } from '@/components/commons/clientProviders'

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
    <html lang="en">
      <head></head>
      <GoogleTagManager gtmId={gtmId!} />
      <body>
        <AuthProvider>
          <ClientProviders>
            <div className="responsive-container">{children}</div>
          </ClientProviders>
        </AuthProvider>
      </body>
    </html>
  )
}
