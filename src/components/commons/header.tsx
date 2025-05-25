'use client'

import { useRouter } from 'next/navigation'

import LeftArrow from '@/assets/icon_back_arrow.svg'

import styles from './header.module.css'
import Typography from '../ui/typography'

type Props = {
  title: string
  titleAlign?: 'left' | 'center'
  rightIcon?: React.ReactNode
  onClick?: () => void
}

const Header = ({
  title,
  titleAlign = 'center',
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
          {titleAlign === 'left' && (
            <Typography
              className={styles.title}
              as="h1"
              variant="text15"
              weight="bold"
            >
              {title}
            </Typography>
          )}
        </div>
        {titleAlign === 'center' && (
          <Typography
            className={styles.center}
            as="h1"
            variant="text15"
            weight="bold"
          >
            {title}
          </Typography>
        )}
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
