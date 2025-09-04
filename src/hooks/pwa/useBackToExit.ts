'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useToast } from '../useToast'

const TARGET_PATHS = ['/exercise', '/timer/list', '/settings']

/**
 * PWA 환경에서 뒤로가기 두 번으로 앱을 종료하는 기능을 위한 훅.
 * 이 훅은 PWA 환경임이 보장된 곳에서만 호출되어야 합니다.
 */
export const useBackToExit = () => {
  const pathname = usePathname()
  const showToast = useToast()
  const isBackPressed = useRef(false)

  useEffect(() => {
    showToast('pwa환경이에요', 'info')
  }, [])

  useEffect(() => {
    const isTargetPath = TARGET_PATHS.some((path) => pathname.startsWith(path))

    if (!isTargetPath) {
      return
    }

    const handlePopState = (e: PopStateEvent) => {
      if (isBackPressed.current) {
        isBackPressed.current = false
        return
      }
      e.preventDefault()
      isBackPressed.current = true

      showToast('한 번 더 누르면 앱이 종료됩니다.', 'info')

      history.pushState(null, '', location.href)

      setTimeout(() => {
        isBackPressed.current = false
      }, 3000)
    }

    history.pushState(null, '', location.href)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [pathname, showToast])
}
