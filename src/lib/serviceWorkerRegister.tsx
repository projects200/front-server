'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    isSwRegistered?: boolean;
  }
}

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator && !window.isSwRegistered) {
      window.isSwRegistered = true;
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered once with scope:', registration.scope)
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
          window.isSwRegistered = false;
        })
    }
  }, [])

  return null
}