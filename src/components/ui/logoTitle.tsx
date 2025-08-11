'use client'

import Logo from '@/assets/logo.svg'
import ServiceName from '@/assets/service_name.svg'

import styles from './logoTitle.module.css'

export default function LogoTitle() {
  return (
    <header className={styles['header']}>
      <div className={styles['brand']}>
        <Logo className={styles['logo']} />
        <ServiceName className={styles['service-name']} />
      </div>
    </header>
  )
}
