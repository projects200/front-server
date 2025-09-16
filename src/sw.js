importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js',
)
importScripts('/firebase-messaging-sw.js')

self.addEventListener('install', () => {
  console.log('Service Worker: Installing and skipping waiting...')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  event.waitUntil(self.clients.claim())
})

if (workbox) {
  console.log(`Workbox is loaded. Applying runtime caching.`)

  const staleWhileRevalidate = new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })

  // JS, CSS, Web Font 파일에 대해 캐싱 전략을 적용합니다.
  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === 'script' ||
      request.destination === 'style' ||
      request.destination === 'font',
    staleWhileRevalidate,
  )
} else {
  console.log(`Workbox didn't load.`)
}
