'use client'

import { useState, useEffect } from 'react'

import Modal from '@/components/ui/modal'
import Button from '@/components/ui/button'
import NotificationIcon from '@/assets/icon_notification.svg'
import Typography from '@/components/ui/typography'
import {
  requestNotificationPermission,
  getFcmToken,
} from '@/lib/firebase/config'
import { usePostFcmToken } from '@/hooks/api/useFcmApi'

import styles from './notificationPermissionModal.module.css'

// localStorage: 사용자의 최종 결정 기록 ('granted', 'denied', 'later')
const USER_NOTIFICATION_PREFERENCE_KEY = 'user_notification_preference'
// sessionStorage: 이번 세션에서 토큰 동기화 여부 확인
const FCM_TOKEN_SYNCED_THIS_SESSION_KEY = 'fcm_token_synced_this_session'

export function NotificationPermissionModal() {
  const [showModal, setShowModal] = useState(false)
  const { trigger: registerToken, isMutating } = usePostFcmToken()

  const syncToken = async () => {
    try {
      const fcmToken = await getFcmToken()
      if (fcmToken) {
        await registerToken(fcmToken)
        sessionStorage.setItem('fcm_token', fcmToken)
        sessionStorage.setItem(FCM_TOKEN_SYNCED_THIS_SESSION_KEY, 'true')
      }
    } catch (err) {
      console.error('FCM 토큰 동기화 에러:', err)
    }
  }

  useEffect(() => {
    if (
      isMutating ||
      typeof window === 'undefined' ||
      !('Notification' in window)
    ) {
      return
    }

    const checkPermissionAndSync = async () => {
      const currentPermission = Notification.permission

      if (currentPermission === 'granted') {
        if (
          sessionStorage.getItem(FCM_TOKEN_SYNCED_THIS_SESSION_KEY) !== 'true'
        ) {
          await syncToken()
        }
      } else if (currentPermission === 'default') {
        if (
          localStorage.getItem(USER_NOTIFICATION_PREFERENCE_KEY) !== 'later'
        ) {
          setShowModal(true)
        }
      }
    }

    checkPermissionAndSync()
  }, [isMutating])

  // 허용 버튼 클릭 핸들러
  const handleAllowNotifications = async () => {
    setShowModal(false)
    const permissionResult = await requestNotificationPermission()

    if (permissionResult === 'granted') {
      localStorage.setItem(USER_NOTIFICATION_PREFERENCE_KEY, 'granted')
      await syncToken()
    } else if (permissionResult === 'denied') {
      localStorage.setItem(USER_NOTIFICATION_PREFERENCE_KEY, 'denied')
    }
  }

  // 나중에 버튼 클릭 핸들러
  const handleLater = () => {
    localStorage.setItem(USER_NOTIFICATION_PREFERENCE_KEY, 'later')
    setShowModal(false)
  }

  return (
    <Modal isOpen={showModal} onClose={handleLater}>
      <NotificationIcon className={styles['icon']} />
      <Typography
        className={styles['title']}
        as="h2"
        variant="content-large"
        weight="bold"
      >
        운다방 알림권한을 허용하시겠습니까?
      </Typography>
      <div className={styles['button-group']}>
        <Button
          className={styles['button']}
          variant="primary"
          onClick={handleAllowNotifications}
        >
          허용
        </Button>
        <Button
          className={styles['button']}
          variant="secondary"
          onClick={handleLater}
        >
          나중에
        </Button>
      </div>
    </Modal>
  )
}
