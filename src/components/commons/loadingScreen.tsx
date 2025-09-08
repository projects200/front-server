'use client'

import LoadingSVG from '@/assets/loading_spinner.svg'

import Portal from '../ui/portal'
import styles from './loadingScreen.module.css'

export default function LoadingScreen() {
  return (
    <Portal>
      <div className={styles['container']}>
        <LoadingSVG className={styles['loading']} />
      </div>
    </Portal>
  )
}
