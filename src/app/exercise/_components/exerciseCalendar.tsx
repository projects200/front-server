'use client'

import { useState, useMemo } from 'react'
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
} from 'date-fns'
import { ko } from 'date-fns/locale'

import { useReadExerciseRange } from '@/hooks/useExerciseApi'
import LeftArrow from '@/assets/icon_left_arrow.svg'
import RightArrow from '@/assets/icon_right_arrow.svg'
import Typography from '@/components/ui/typography'

import ExerciseCalendarBody from './exerciseCalendarBody'
import styles from './exerciseCalendar.module.css'

export default function ExerciseCalendar() {
  const today = new Date()
  const [month, setMonth] = useState<Date>(startOfMonth(today))

  const startDate: string = format(startOfMonth(month), 'yyyy-MM-dd')
  const endDate: string = isSameMonth(month, today)
    ? format(today, 'yyyy-MM-dd')
    : format(endOfMonth(month), 'yyyy-MM-dd')

  const { data } = useReadExerciseRange(startDate, endDate)
  const counts = useMemo<Record<string, number>>(() => {
    const map: Record<string, number> = {}
    if (data) {
      data.forEach(({ date, record }) => {
        map[date] = record
      })
    }
    return map
  }, [data])

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

  const handlePrev = () => setMonth(subMonths(month, 1))
  const handleNext = () => {
    if (month.getTime() >= startOfMonth(today).getTime()) return
    setMonth(addMonths(month, 1))
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

      <ExerciseCalendarBody
        key={month.toISOString()}
        weeks={weeks}
        month={month}
        today={today}
        counts={counts}
      />
    </div>
  )
}
