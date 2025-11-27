'use client'

import { useEffect } from 'react'
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics'
import { firebaseApp } from './config'

type AnalyticsParams = {
  [key: string]: string | number | boolean | undefined
}

export const logAnalyticsEvent = async (
  eventName: string,
  params?: AnalyticsParams,
) => {
  if (typeof window === 'undefined') return

  try {
    const supported = await isSupported()
    if (supported) {
      const analytics = getAnalytics(firebaseApp)
      logEvent(analytics, eventName, params)
    }
  } catch (error) {
    console.error('구글 애널리틱스 로그 에러 : ', error)
  }
}

function Analytics() {
  useEffect(() => {
    logAnalyticsEvent('page_view', {
      page_path: window.location.pathname,
    })
  }, [])
  return null
}

export default Analytics
