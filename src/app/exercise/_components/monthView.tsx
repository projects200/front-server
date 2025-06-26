'use client'

import { memo, useState, useEffect, useMemo } from 'react'

import {
  format,
  isSameMonth,
  isSameDay,
  isAfter,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
} from 'date-fns'
import clsx from 'clsx'

import StampIcon from '@/assets/stamp.svg'

import Typography from '@/components/ui/typography'
import styles from './monthView.module.css'

type Props = {
  month: Date
  today: Date
  counts: Record<string, number>
  onDateClick: (date: Date) => void
}

const MonthView = memo(function MonthView({
  month,
  today,
  counts,
  onDateClick,
}: Props) {
  const [notCacheData, setNotCacheData] = useState(false)

  const weeks = useMemo(() => {
    const gridStart = startOfWeek(startOfMonth(month), { weekStartsOn: 0 })
    const gridEnd = endOfWeek(endOfMonth(month), { weekStartsOn: 0 })

    const newWeeks: Date[][] = []
    let cursor = gridStart
    while (cursor <= gridEnd) {
      const days: Date[] = []
      for (let i = 0; i < 7; i++) {
        days.push(cursor)
        cursor = addDays(cursor, 1)
      }
      newWeeks.push(days)
    }
    return newWeeks
  }, [month])

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
                  onDateClick(day)
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
