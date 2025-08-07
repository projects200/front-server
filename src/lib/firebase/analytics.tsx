'use client'

import { useEffect } from 'react'
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics'
import { firebaseApp } from './config'

function Analytics() {
  useEffect(() => {
    isSupported().then((supported) => {
      if (supported) {
        const analytics = getAnalytics(firebaseApp)
        logEvent(analytics, 'page_view', {
          page_path: window.location.pathname,
        })
      }
    })
  }, [])
  return null
}

export default Analytics
