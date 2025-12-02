importScripts('/firebase-messaging-sw.js')

self.addEventListener('install', () => {
  console.log('Service Worker: Installing and skipping waiting...')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  event.waitUntil(self.clients.claim())
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const data = event.notification.data
  const notificationType = data.type || {}
  let targetUrl = '/'

  switch (notificationType) {
    case 'CHAT_MESSAGE':
      const { chatroomId, memberId, nickname } = data
      targetUrl = `/chat/room?chatRoomId=${chatroomId}&nickName=${nickname}&memberId=${memberId}`
      break
    default:
      break
  }

  // 4. 창 열기/이동 로직
  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (
            client.url.startsWith(self.registration.scope) &&
            'focus' in client
          ) {
            client.focus()
            return client.navigate(targetUrl)
          }
        }
        // 열린 탭이 없다면 새 창 열기
        if (clients.openWindow) {
          return clients.openWindow(targetUrl)
        }
      }),
  )
})
