'use client'

import { memo, useMemo, useRef } from 'react'

import {
  eachWeekOfInterval,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isAfter,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  parseISO,
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
  selectedDate: string
  isReadOnly: boolean
  showStamps: boolean
}

const MonthView = memo(function MonthView({
  month,
  today,
  counts,
  onDateClick,
  selectedDate,
  isReadOnly,
  showStamps,
}: Props) {
  const prevCounts = useRef(counts)
  const shouldAnimate = useMemo(() => {
    const prevData = Object.keys(prevCounts.current).length === 0
    const currentData = Object.keys(counts).length > 0
    return prevData && currentData
  }, [counts])

  const weeks = useMemo(() => {
    const monthStart = startOfMonth(month)
    const monthEnd = endOfMonth(month)
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 })
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })

    const weekStarts = eachWeekOfInterval(
      { start: gridStart, end: gridEnd },
      { weekStartsOn: 0 },
    )

    return weekStarts.map((weekStart) =>
      eachDayOfInterval({
        start: weekStart,
        end: addDays(weekStart, 6),
      }),
    )
  }, [month])

  return (
    <div className={styles['calendar']}>
      {weeks.map((week, wi) => (
        <div key={wi} className={styles['week']}>
          {week.map((day) => {
            const dateStr = format(day, 'yyyy-MM-dd')
            const isCurrent = isSameMonth(day, month)
            const isFuture = isAfter(day, today)
            const isSelected = isSameDay(day, parseISO(selectedDate))
            const count = counts[dateStr] ?? 0

            const stampIconClassName = clsx(styles['stamp-icon'], {
              [styles['animate-fade-in']]: shouldAnimate,
              [styles['show-immediately']]: !shouldAnimate,
            })

            return (
              <div
                key={dateStr}
                className={clsx(
                  styles['cell'],
                  !isCurrent && styles['empty'],
                  isFuture && styles['disabled'],
                  isSelected && styles['selected'],
                  !showStamps && styles['is-picker'],
                )}
                onClick={() => {
                  if (!isCurrent || isFuture || isReadOnly) return
                  onDateClick(day)
                }}
              >
                <Typography as="span" variant="content-medium">
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
