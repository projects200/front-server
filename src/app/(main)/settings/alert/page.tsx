'use client'

import { useState, useEffect } from 'react'

import {
  useReadNotificationSettingList,
  usePatchNotificationSettingItems,
} from '@/hooks/api/useFcmApi'
import Header from '@/components/commons/header'
import ToggleSwitch from '@/components/ui/toggleSwitch'
import Typography from '@/components/ui/typography'
import { NotificationType, NotificationSetting } from '@/types/fcm'

import styles from './alert.module.css'

export default function Alert() {
  const fcmToken = sessionStorage.getItem('fcm_token')
  const [exerciseAlert, setExerciseAlert] = useState(false)
  const [chatAlert, setChatAlert] = useState(false)
  const [notificationPermission, setNotificationPermission] =
    useState('default')

  const { data } = useReadNotificationSettingList(fcmToken)
  const { trigger: updateNotificationSetting } =
    usePatchNotificationSettingItems(fcmToken)

  const handleSettingChange = async (
    typeToChange: NotificationType,
    newEnabled: boolean,
  ) => {
    const payload: NotificationSetting[] = [
      {
        type: 'WORKOUT_REMINDER',
        enabled:
          typeToChange === 'WORKOUT_REMINDER' ? newEnabled : exerciseAlert,
      },
      {
        type: 'CHAT_MESSAGE',
        enabled: typeToChange === 'CHAT_MESSAGE' ? newEnabled : chatAlert,
      },
    ]

    try {
      await updateNotificationSetting(payload)

      if (typeToChange === 'WORKOUT_REMINDER') {
        setExerciseAlert(newEnabled)
      } else {
        setChatAlert(newEnabled)
      }
    } catch {}
  }

  const handleExerciseToggle = () =>
    handleSettingChange('WORKOUT_REMINDER', !exerciseAlert)
  const handleChatToggle = () => handleSettingChange('CHAT_MESSAGE', !chatAlert)

  useEffect(() => {
    if (data && Array.isArray(data)) {
      data.forEach((setting) => {
        switch (setting.type) {
          case 'WORKOUT_REMINDER':
            setExerciseAlert(setting.enabled)
            break
          case 'CHAT_MESSAGE':
            setChatAlert(setting.enabled)
            break
          default:
            break
        }
      })
    }
  }, [data])

  // 브라우저의 안림권한이 있는지 확인
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission)
    }
  }, [])

  return (
    <div className={styles['container']}>
      <Header className="left-title">알림</Header>

      {notificationPermission !== 'granted' && (
        <div className={styles['notice-container']}>
          <Typography as="p" variant="content-large">
            현재 알림 권한이 없습니다. 시스템 설정에서 알림 권한을 켜주세요
          </Typography>
        </div>
      )}

      <div className={styles['item-container']}>
        {notificationPermission !== 'granted' && (
          <span className={styles['menu-item-block']} />
        )}
        <div className={styles['menu-item']}>
          <Typography as="p" variant="content-large">
            운동 독려 알림
          </Typography>
          <ToggleSwitch
            id="exercise-toggle"
            checked={exerciseAlert}
            onChange={handleExerciseToggle}
          />
        </div>
        <div className={styles['menu-item']}>
          <Typography as="p" variant="content-large">
            채팅 알림
          </Typography>
          <ToggleSwitch
            id="chat-toggle"
            checked={chatAlert}
            onChange={handleChatToggle}
          />
        </div>
      </div>
    </div>
  )
}
