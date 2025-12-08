import AuthGuard from '@/app/_components/authGuard'

import { NotificationPermissionModal } from './_components/notificationPermissionModal'

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <AuthGuard>
      {children}
      <NotificationPermissionModal />
    </AuthGuard>
  )
}

export default Layout
