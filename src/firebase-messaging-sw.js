try {
  importScripts(
    'https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js',
  )
  console.log('Firebase App SDK loaded')
} catch (error) {
  console.error('Firebase App SDK failed to load:', error)
}

try {
  importScripts(
    'https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js',
  )
  console.log('Firebase Messaging SDK loaded')
} catch (error) {
  console.error('Firebase Messaging SDK failed to load:', error)
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

if (typeof firebase !== 'undefined') {
  try {
    firebase.initializeApp(firebaseConfig)
    const messaging = firebase.messaging()

    messaging.onBackgroundMessage((payload) => {
      console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload,
      )

      const data = payload.data || {}
      let notificationTitle
      let notificationOptions = {
        body: '',
        icon: '/icons/apple-touch-icon.png',
        data: data, 
        tag: 'default-alert',
      }

      switch (data.type) {
        case 'CHAT_MESSAGE':
          notificationTitle = data.nickname
          notificationOptions.body = data.content
          notificationOptions.tag = `chat-${data.chatroomId}`
          break
        default:
          notificationTitle = '운다방'
          notificationOptions.body = '운다방에서 알림이 도착했습니다.'
          break
      }

      return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
      )
    })
  } catch (error) {
    console.error('Error in firebase-messaging-sw.js:', error)
  }
} else {
  console.error(
    'Firebase is not defined. Check if the SDK scripts were loaded correctly.',
  )
}