import AuthGuard from '@/app/_components/authGuard'

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <AuthGuard>
      <div className="container-timer">{children}</div>
    </AuthGuard>
  )
}

export default Layout
