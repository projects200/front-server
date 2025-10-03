importScripts('/firebase-messaging-sw.js')

self.addEventListener('install', () => {
  console.log('Service Worker: Installing and skipping waiting...')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  event.waitUntil(self.clients.claim())
})