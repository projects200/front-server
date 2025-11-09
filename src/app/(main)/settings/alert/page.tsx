'use client'

import { useState, useEffect } from 'react'

import Header from '@/components/commons/header'
import ToggleSwitch from '@/components/ui/toggleSwitch'
import Typography from '@/components/ui/typography'

import styles from './alert.module.css'

export default function Alert() {
  const [exerciseAlert, setExerciseAlert] = useState(false)
  const [chatAlert, setChatAlert] = useState(false)
  const [notificationPermission, setNotificationPermission] =
    useState('default')

  const handleExerciseToggle = async () => {
    // Todo : 운동알림 on/off API 호출
    setExerciseAlert(!exerciseAlert)
  }
  const handleChatToggle = async () => {
    // Todo : 채팅알림 on/off API 호출
    setChatAlert(!chatAlert)
  }

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
