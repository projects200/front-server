/* eslint-disable no-restricted-globals */
self.addEventListener('install', (event) => {
  console.log('Service Worker 설치 완료!')
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker 활성화 완료!')
})

self.addEventListener('fetch', (event) => {})
