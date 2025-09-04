'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import SITE_MAP from '@/constants/siteMap.constant'
import RecordIcon from '@/assets/icon_nav_record.svg'
import TimerIcon from '@/assets/icon_nav_timer.svg'
import SettingsIcon from '@/assets/icon_nav_setting.svg'
import Typography from '../ui/typography'

import styles from './bottomNavigation.module.css'

const navLinks = [
  { name: '기록', href: SITE_MAP.EXERCISE, icon: RecordIcon },
  { name: '타이머', href: SITE_MAP.TIMER_LIST, icon: TimerIcon },
  { name: '설정', href: SITE_MAP.SETTINGS, icon: SettingsIcon },
]

export default function BottomNavigation() {
  const pathname = usePathname()

  return (
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
            <Typography className={styles['label']} as="span" variant="text12">
              {link.name}
            </Typography>
          </Link>
        )
      })}
    </nav>
  )
}
