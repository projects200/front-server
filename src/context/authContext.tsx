'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { userManager } from '@/lib/auth'

type AuthContextType = {
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkUser() {
      const user = await userManager.getUser()
      setIsAuthenticated(!!user && !user.expired)
      setLoading(false)
    }

    checkUser()

    // 토큰 만료 또는 silent renew 실패 시 로그아웃 처리
    const onTokenExpired = () => {
      setIsAuthenticated(false)
    }
    const onSilentRenewError = () => {
      setIsAuthenticated(false)
    }

    userManager.events.addAccessTokenExpired(onTokenExpired)
    userManager.events.addSilentRenewError(onSilentRenewError)

    return () => {
      userManager.events.removeAccessTokenExpired(onTokenExpired)
      userManager.events.removeSilentRenewError(onSilentRenewError)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
