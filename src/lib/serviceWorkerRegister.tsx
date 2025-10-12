'use client'

import { useEffect } from 'react'

const registerSW = () => {
  navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => {
      console.log('Service Worker registered:', registration.scope)
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error)
    })
}

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
      window.addEventListener('load', registerSW)
      
      return () => {
        window.removeEventListener('load', registerSW)
      }
    }
  }, [])

  return null
}
