'use client'

import { useRouter } from 'next/navigation'
import LeftArrow from '@/assets/icon_back_arrow.svg'
import styles from './header.module.css'
import Typography from '../ui/typography'

type Props = {
  title: string
}

const Header = ({ title }: Props) => {
  const router = useRouter()

  return (
    <div>
      <header className={styles['header']}>
        <button className={styles['back-button']} onClick={() => router.back()}>
          <LeftArrow className={styles['icon']} />
        </button>
        <Typography
          className={styles[title]}
          as="h1"
          variant="text16"
          weight="bold"
        >
          {title}
        </Typography>
      </header>
      <div className={styles['back-area']}></div>
    </div>
  )
}

export default Header
