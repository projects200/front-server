'use client'

import { useEffect } from 'react'

type Platform = 'ANDROID' | 'IOS' | 'PC' | 'ETC'
type AccessMode = 'PWA' | 'BROWSER'
type DeviceInfo = {
  platform: Platform
  accessMode: AccessMode
}
declare global {
  interface Navigator {
    standalone?: boolean
  }
}

function getDeviceInfo(): DeviceInfo {
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
    window.matchMedia('(display-mode: standalone)').matches ||
    navigator.standalone // iOS PWA에서 설치된 앱으로 실행 중일 때
  ) {
    accessMode = 'PWA'
  }

  return { platform, accessMode }
}

export function DeviceInfo() {
  useEffect(() => {
    const deviceInfo = getDeviceInfo()

    alert(`
      Platform: ${deviceInfo.platform}
      Access Mode: ${deviceInfo.accessMode}
    `)
  }, [])

  return null
}
