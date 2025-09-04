'use client'

import Link from 'next/link'
import clsx from 'clsx'

import BottomNavigation from '@/components/commons/bottomNavigation'
import LogoTitle from '@/components/ui/logoTitle'
import RightArrow from '@/assets/icon_right_arrow.svg'
import PlusIcon from '@/assets/icon_plus.svg'
import Typography from '@/components/ui/typography'
import { useReadCustomTimerList } from '@/hooks/useTimerApi'
import SITE_MAP from '@/constants/siteMap.constant'

import styles from './list.module.css'

export default function List() {
  const { data } = useReadCustomTimerList()

  return (
    <div className={styles['container']}>
      <LogoTitle />
      <div className={styles['list-section']}>
        <Link
          className={styles['simple-timer-container']}
          href={SITE_MAP.TIMER_SIMPLE}
        >
          <Typography
            className={styles['simple-timer-text']}
            as="span"
            variant="text18"
            weight="medium"
          >
            심플 타이머
          </Typography>
          <RightArrow className={styles['right-arrow-icon']} />
        </Link>

        {data &&
          data.customTimerList.map((list) => (
            <Link
              key={list.customTimerId}
              className={styles['custom-timer-container']}
              href={`${SITE_MAP.TIMER_CUSTOM}?id=${list.customTimerId}`}
            >
              <Typography as="span" variant="text18" weight="medium">
                {list.customTimerName}
              </Typography>
              <RightArrow
                className={clsx(
                  styles['right-arrow-icon'],
                  styles['right-arrow-icon-black'],
                )}
              />
            </Link>
          ))}

        <Link
          className={clsx(
            styles['custom-timer-container'],
            styles['creator-container'],
          )}
          href={SITE_MAP.TIMER_CREATE}
        >
          {data && data.customTimerList.length === 0 ? (
            <>
              <Typography as="span" variant="text18" weight="medium">
                나만의 타이머
              </Typography>
              <PlusIcon className={styles['plus-icon']} />
            </>
          ) : (
            <PlusIcon className={styles['plus-icon-center']} />
          )}
        </Link>
      </div>
      <BottomNavigation />
    </div>
  )
}
