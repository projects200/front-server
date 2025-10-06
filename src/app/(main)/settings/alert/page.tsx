'use client'

import Header from '@/components/commons/header'

import styles from './alert.module.css'
import Typography from '@/components/ui/typography'

export default function Alert() {
  const handleAlertButton = () => {
    alert('test')
  }
  return (
    <div className={styles['container']}>
      <Header className="left-title">알림</Header>
      <button className={styles['menu-item']} onClick={handleAlertButton}>
        <Typography as="p" variant="content-large">
          알림 권한 설정으로 이동
        </Typography>
      </button>
    </div>
  )
}
