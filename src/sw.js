importScripts('/firebase-messaging-sw.js')

const TIMER_INTERVAL = 500

let intervalId = null
let targetTime = 0

// 타이머가 종료되었는지 확인하는 함수
function tick() {
  if (Date.now() >= targetTime) {
    const title = '심플 타이머 종료'
    const options = {
      icon: '/icons/logo192.png',
    }
    self.registration.showNotification(title, options)

    self.clients.matchAll().then((clients) => {
      clients.forEach((client) =>
        client.postMessage({ type: 'TIMER_FINISHED' }),
      )
    })
    clearInterval(intervalId)
    intervalId = null
  }
}

// 타이머의 백그라운드, 온그라운드 전환
self.addEventListener('message', (event) => {
  if (!event.data || !event.data.action) return

  const { action, payload } = event.data

  switch (action) {
    case 'TAKE_OVER_TIMER':
      if (intervalId) clearInterval(intervalId)
      targetTime = payload.targetTime
      intervalId = setInterval(tick, TIMER_INTERVAL)
      break

    case 'STOP_BACKGROUND_TIMER':
      if (intervalId) clearInterval(intervalId)
      intervalId = null
      break
  }
})

// 서비스 워커 설치
self.addEventListener('install', () => {
  console.log('Service Worker: Installing and skipping waiting...')
  self.skipWaiting()
})

// 서비스 워커 활성화
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  event.waitUntil(self.clients.claim())
})
