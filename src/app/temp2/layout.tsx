import { AuthProvider } from '@/context/authContext'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="temp-layout">
      <AuthProvider>{children}</AuthProvider>
    </div>
  )
}
