'use client'

import { memo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { format, isSameMonth, isSameDay, isAfter } from 'date-fns'
import clsx from 'clsx'

import StampIcon from '@/assets/stamp.svg'
import SITE_MAP from '@/constants/siteMap.constant'
import Typography from '@/components/ui/typography'
import styles from './monthView.module.css'

type Props = {
  weeks: Date[][]
  month: Date
  today: Date
  counts: Record<string, number>
}

const MonthView = memo(function MonthView({
  weeks,
  month,
  today,
  counts,
}: Props) {
  const router = useRouter()
  const [notCacheData, setNotCacheData] = useState(false)

  // counts값이 변경될때마다 캐시된 데이터인지 여부를 판단하여 스탬프 아이콘에 fadeIn 효과를 줄지 즉시 표시해줄지 판단합니다.
  useEffect(() => {
    const isEmpty = Object.keys(counts).length === 0
    if (!notCacheData && isEmpty) setNotCacheData(true)
  }, [counts])

  return (
    <div className={styles['calendar']}>
      {weeks.map((week, wi) => (
        <div key={wi} className={styles['week']}>
          {week.map((day) => {
            const dateStr = format(day, 'yyyy-MM-dd')
            const isCurrent = isSameMonth(day, month)
            const isFuture = isAfter(day, today)
            const isToday = isSameDay(day, today)
            const count = counts[dateStr] ?? 0

            const stampIconClassName = clsx(styles['stamp-icon'], {
              [styles['animate-fade-in']]: notCacheData,
              [styles['show-immediately']]: !notCacheData,
            })

            return (
              <div
                key={dateStr}
                className={clsx(
                  styles['cell'],
                  !isCurrent && styles['empty'],
                  isFuture && styles['disabled'],
                  isToday && styles['today'],
                )}
                onClick={() => {
                  if (!isCurrent || isFuture) return
                  router.push(`${SITE_MAP.EXERCISE_LIST}?date=${dateStr}`)
                }}
              >
                <Typography as="span" variant="text14">
                  {format(day, 'd')}
                </Typography>
                {count > 0 && <StampIcon className={stampIconClassName} />}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
})

export default MonthView
