'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

import LeftArrow from '@/assets/icon_left_arrow.svg'

import styles from './header.module.css'
import Typography from '../ui/typography'

type Props = {
  children?: ReactNode
  classNames?: string
  showBack?: boolean
  onBack?: () => void
  right?: ReactNode
}

const Header = ({ children = '', classNames = 'center', showBack = true, onBack, right }: Props) => {
  const router = useRouter()

  const handleBack = () => (onBack ? onBack() : router.back())

  return (
    <header className={styles['header']}>
      {showBack && (
        <button type="button" className={styles['left-section']} onClick={handleBack}>
          <LeftArrow className={styles['back-icon']} />
        </button>
      )}

      <Typography className={styles[classNames]} as="h1" variant="content-large" weight="bold">
        {children}
      </Typography>

      <div className={styles['right-section']}>{right}</div>
    </header>
  )
}

export default Header
