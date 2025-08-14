'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

import LeftArrow from '@/assets/icon_left_arrow.svg'

import styles from './header.module.css'
import Typography from '../ui/typography'

type Props = {
  children: ReactNode
  className?: string
  rightIcon?: React.ReactNode
  onClick?: () => void
}

const Header = ({
  children,
  className = 'center-title',
  rightIcon,
  onClick,
}: Props) => {
  const router = useRouter()

  return (
    <>
      <header className={styles['header']}>
        <div className={styles['left']}>
          <button
            className={styles['back-button']}
            onClick={() => router.back()}
          >
            <LeftArrow className={styles['back-icon']} />
          </button>
        </div>
        <Typography
          className={styles[className]}
          as="h1"
          variant="text15"
          weight="bold"
        >
          {children}
        </Typography>
        {rightIcon && (
          <button className={styles['right-icon']} onClick={onClick}>
            {rightIcon}
          </button>
        )}
      </header>
      <div className={styles['back-area']}></div>
    </>
  )
}

export default Header
