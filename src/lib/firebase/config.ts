import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import { getMessaging, getToken, Messaging } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const firebaseApp: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp()

let messaging: Messaging | null = null

const initializeMessaging = () => {
  if (typeof window !== 'undefined') {
    if (!messaging) {
      messaging = getMessaging(firebaseApp)
    }
  }
  return messaging
}

const requestFcmToken = async (): Promise<string | null> => {
  const messagingInstance = initializeMessaging()

  if (!messagingInstance) return null

  try {
    const serviceWorkerRegistration =
      await navigator.serviceWorker.register('/sw.js')

    const permission = await Notification.requestPermission()
    if (permission !== 'granted') {
      return null
    }

    const currentToken = await getToken(messagingInstance, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: serviceWorkerRegistration,
    })

    return currentToken
  } catch (err) {
    console.error('An error occurred while retrieving token. ', err)
    return null
  }
}

export { firebaseApp, messaging, requestFcmToken }
