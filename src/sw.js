// 오프라인 캐싱전략은 추후 개발
// importScripts(
//   'https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js',
// )
importScripts('/firebase-messaging-sw.js')

self.addEventListener('install', () => {
  console.log('Service Worker: Installing...')
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
