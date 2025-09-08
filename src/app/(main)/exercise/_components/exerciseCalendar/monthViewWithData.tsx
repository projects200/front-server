'use client'

import useSWR from 'swr'
import { format, isSameMonth, startOfMonth, endOfMonth } from 'date-fns'

import { useReadExerciseRange } from '@/hooks/useExerciseApi'
import { ExerciseRange } from '@/types/exercise'

import MonthView from './monthView'
import styles from './monthViewWithData.module.css'

type Props = {
  today: Date
  monthToShow: Date
  isActive: boolean
  onDateSelect: (date: Date) => void
  selectedDate: string
}

const MonthViewWithData = ({
  today,
  monthToShow,
  isActive,
  onDateSelect,
  selectedDate,
}: Props) => {
  const isFutureMonth = monthToShow.getTime() > startOfMonth(today).getTime()
  const shouldFetch = !isFutureMonth && isActive
  const startDate = format(startOfMonth(monthToShow), 'yyyy-MM-dd')
  const endDate = isSameMonth(monthToShow, today)
    ? format(today, 'yyyy-MM-dd')
    : format(endOfMonth(monthToShow), 'yyyy-MM-dd')
  const { data: fetchedData } = useReadExerciseRange(
    startDate,
    endDate,
    shouldFetch,
  )
  const swrKey = ['exercise/range', startDate.substring(0, 7)]
  const { data: cachedData } = useSWR<ExerciseRange[]>(swrKey, null)
  const data = fetchedData || cachedData
  const counts: Record<string, number> = {}

  if (data) {
    data.forEach(({ date, record }) => {
      counts[date] = record
    })
  }

  const handleDateClick = (date: Date) => {
    onDateSelect(date)
  }

  return (
    <div className={styles['month-view-wrapper']}>
      <MonthView
        key={monthToShow.toISOString()}
        month={monthToShow}
        today={today}
        counts={counts}
        onDateClick={handleDateClick}
        selectedDate={selectedDate}
      />
    </div>
  )
}

export default MonthViewWithData
