import AuthGuard from '@/app/_components/authGuard'

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <AuthGuard>{children}</AuthGuard>
}

export default Layout
