import type { Metadata } from 'next'
import { GoogleTagManager } from '@next/third-parties/google'

import './reset.css'
import './globals.css'
import { AuthProvider } from '@/context/authContext'

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
      <head>{/* GTM Script */}</head>
      <GoogleTagManager gtmId={gtmId!} />
      <body>
        <noscript></noscript>
        <AuthProvider>
          <div className="responsive-container">{children}</div>
        </AuthProvider>
      </body>
    </html>
  )
}
