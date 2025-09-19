'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import SITE_MAP from '@/constants/siteMap.constant'
import MatchIcon from '@/assets/icon_nav_match.svg'
import RecordIcon from '@/assets/icon_nav_record.svg'
import TimerIcon from '@/assets/icon_nav_timer.svg'
import MypageIcon from '@/assets/icon_nav_mypage.svg'
import Typography from '../ui/typography'

import styles from './bottomNavigation.module.css'

const navLinks = [
  { name: '기록', href: SITE_MAP.EXERCISE, icon: RecordIcon },
  { name: '매칭', href: SITE_MAP.MATCH, icon: MatchIcon },
  { name: '타이머', href: SITE_MAP.TIMER_LIST, icon: TimerIcon },
  { name: 'MY', href: SITE_MAP.MYPAGE, icon: MypageIcon },
]

export default function BottomNavigation() {
  const pathname = usePathname()

  return (
    <>
      <nav className={styles['nav']}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          const Icon = link.icon
          return (
            <Link
              href={link.href}
              key={link.name}
              className={clsx(styles['link'], { [styles['active']]: isActive })}
              replace
            >
              <Icon className={styles['icon']} />
              <Typography
                className={clsx(styles['label'], {
                  [styles['active']]: isActive,
                })}
                as="span"
                variant="text12"
              >
                {link.name}
              </Typography>
            </Link>
          )
        })}
      </nav>
      <div className={styles['spacer']} />
    </>
  )
}
