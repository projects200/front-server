importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js',
)
importScripts('/firebase-messaging-sw.js')

self.addEventListener('install', () => {
  console.log('Service Worker: Installing...')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  event.waitUntil(self.clients.claim())
})

if (workbox) {
  console.log(`Workbox is loaded`)
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || [])
} else {
  console.log(`Workbox didn't load`)
}
