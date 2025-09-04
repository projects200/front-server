'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) =>
            console.log('Service Worker 등록:', registration.scope),
          (err) => console.error('Service Worker 미등록:', err),
        )
      })
    }
  }, [])

  return null
}
