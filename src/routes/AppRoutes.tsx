import { Routes, Route } from 'react-router-dom'
import { ROUTE_PATHS } from './routePaths'

import HomePage from '../pages/home/HomePage'
import LoginPage from '../pages/auth/LoginPage'

const AppRoutes = () => {
  return (
    <Routes>
      {/* ROOT */}
      <Route path={ROUTE_PATHS.ROOT} element={<HomePage />} />

      {/* AUTH */}
      <Route path={ROUTE_PATHS.AUTH.LOGIN} element={<LoginPage />} />
    </Routes>
  )
}

export default AppRoutes
