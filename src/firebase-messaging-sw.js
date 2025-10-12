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

try {
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig)
    firebase.messaging()
    console.log('Firebase initialized in Service Worker')
  } else {
    console.warn('Firebase not available in Service Worker, because firebase type is undefined')
  }
} catch (error) {
  console.error('Firebase initialization failed:', error)
}
