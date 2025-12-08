'use client'

import { useEffect } from 'react'

type Platform = 'ANDROID' | 'IOS' | 'PC' | 'ETC'
type AccessMode = 'PWA' | 'BROWSER'
type DeviceInfoType = {
  platform: Platform
  accessMode: AccessMode
}
declare global {
  interface Navigator {
    standalone?: boolean
  }
}

export function getDeviceInfo(): DeviceInfoType {
  const userAgent = navigator.userAgent

  // 1. Platform 감지
  let platform: Platform = 'ETC'
  if (/Android/i.test(userAgent)) {
    platform = 'ANDROID'
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    // iOS 기기는 iPhone, iPad, iPod 모두 포함하여 판단
    platform = 'IOS'
  } else if (/Windows|Mac|Linux/i.test(userAgent)) {
    // 일반적인 데스크톱 OS
    platform = 'PC'
  }

  // 2. AccessMode 감지
  let accessMode: AccessMode = 'BROWSER'
  if (
    window.matchMedia('(display-mode: standalone)').matches || // Android PWA로 실행중일 때
    navigator.standalone // iOS PWA로 실행중일 때
  ) {
    accessMode = 'PWA'
  }

  return { platform, accessMode }
}

export function DeviceInfoReporter() {
  useEffect(() => {
    const storedPlatform = sessionStorage.getItem('platform')
    const storedAccessMode = sessionStorage.getItem('access_mode')

    if (!storedPlatform || !storedAccessMode) {
      const deviceInfo = getDeviceInfo()
      sessionStorage.setItem('platform', deviceInfo.platform)
      sessionStorage.setItem('access_mode', deviceInfo.accessMode)
    }
  }, [])
  return null
}
