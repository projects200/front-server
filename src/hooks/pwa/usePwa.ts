'use client'

import { useState, useEffect } from 'react'

// 현재 앱이 PWA(standalone 모드)로 실행 중인지 확인하는 훅
export const usePwa = (): boolean | null => {
  const [isPwa, setIsPwa] = useState<boolean | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const mediaQuery = window.matchMedia('(display-mode: standalone)')

    const updatePwaStatus = () => {
      setIsPwa(mediaQuery.matches)
    }
    updatePwaStatus()

    mediaQuery.addEventListener('change', updatePwaStatus)

    return () => {
      mediaQuery.removeEventListener('change', updatePwaStatus)
    }
  }, [])

  return isPwa
}
