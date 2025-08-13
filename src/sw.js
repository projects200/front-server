importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js',
)
importScripts('/firebase-messaging-sw.js')
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || [])
