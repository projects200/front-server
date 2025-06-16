'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  subMonths,
  addMonths,
  format,
  isSameMonth,
  isSameDay,
  isAfter,
} from 'date-fns'
import { ko } from 'date-fns/locale'
import clsx from 'clsx'

import { useReadExerciseRnage } from '@/hooks/useExerciseApi'
import LeftArrow from '@/assets/icon_left_arrow.svg'
import RightArrow from '@/assets/icon_right_arrow.svg'
import StampIcon from '@/assets/stamp.svg'
import SITE_MAP from '@/constants/siteMap.constant'

import styles from './exerciseCalendar.module.css'
import Typography from '@/components/ui/typography'

export default function ExerciseCalendar() {
  const router = useRouter()
  const today = new Date()
  const [month, setMonth] = useState<Date>(startOfMonth(today))
  const [startX, setStartX] = useState<number | null>(null)

  const startDate: string = format(startOfMonth(month), 'yyyy-MM-dd')
  const endDate: string = isSameMonth(month, today)
    ? format(today, 'yyyy-MM-dd')
    : format(endOfMonth(month), 'yyyy-MM-dd')

  const { data } = useReadExerciseRnage(startDate, endDate)

  const counts = useMemo<Record<string, number>>(() => {
    const map: Record<string, number> = {}
    if (data) {
      data.forEach(({ date, record }) => {
        map[date] = record
      })
    }
    return map
  }, [data])

  const gridStart = startOfWeek(startOfMonth(month), { weekStartsOn: 0 })
  const gridEnd = endOfWeek(endOfMonth(month), { weekStartsOn: 0 })

  const weeks: Date[][] = []
  let cursor = gridStart
  while (cursor <= gridEnd) {
    const days: Date[] = []
    for (let i = 0; i < 7; i++) {
      days.push(cursor)
      cursor = addDays(cursor, 1)
    }
    weeks.push(days)
  }

  const handlePrev = () => setMonth(subMonths(month, 1))
  const handleNext = () => {
    if (month.getTime() >= startOfMonth(today).getTime()) return
    setMonth(addMonths(month, 1))
  }
  const onTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX)
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX === null) return
    const deltaX = e.changedTouches[0].clientX - startX
    const THRESH = 50
    if (deltaX > THRESH) handlePrev()
    else if (deltaX < -THRESH) handleNext()
    setStartX(null)
  }
  const onMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX)
  }
  const onMouseUp = (e: React.MouseEvent) => {
    if (startX === null) return
    const deltaX = e.clientX - startX
    const THRESH = 50
    if (deltaX > THRESH) handlePrev()
    else if (deltaX < -THRESH) handleNext()
    setStartX(null)
  }

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <button onClick={handlePrev} className={styles['nav-button']}>
          <LeftArrow />
        </button>
        <Typography as="span" variant="text15" weight="bold">
          {format(month, 'yyyy년 M월', { locale: ko })}
        </Typography>
        <button
          onClick={handleNext}
          className={styles['nav-button']}
          disabled={month.getTime() >= startOfMonth(today).getTime()}
        >
          <RightArrow />
        </button>
      </div>

      <div className={styles['weekdays']}>
        {['일', '월', '화', '수', '목', '금', '토'].map((weekday) => (
          <div key={weekday} className={styles['weekday']}>
            <Typography as="span" variant="text14" weight="bold">
              {weekday}
            </Typography>
          </div>
        ))}
      </div>

      <div
        className={styles['calendar']}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {weeks.map((week, wi) => (
          <div key={wi} className={styles['week']}>
            {week.map((day) => {
              const dateStr = format(day, 'yyyy-MM-dd')
              const isCurrent = isSameMonth(day, month)
              const isFuture = isAfter(day, today)
              const isToday = isSameDay(day, today)
              const count = counts[dateStr] ?? 0

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
                  {count > 0 && <StampIcon className={styles['stamp-icon']} />}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
