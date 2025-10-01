'use client'

import { useQueryState } from 'nuqs'
import useSWR from 'swr'
import { format, isSameMonth, startOfMonth, endOfMonth } from 'date-fns'

import { useReadExerciseRange } from '@/hooks/api/useExerciseApi'
import { useReadMemberExerciseRange } from '@/hooks/api/useMemberApi'
import { ExerciseRange } from '@/types/exercise'

import MonthView from './monthView'
import styles from './monthViewWithData.module.css'

type Props = {
  today: Date
  monthToShow: Date
  isActive: boolean
  onDateSelect?: (date: Date) => void
  selectedDate: string
  isReadOnly: boolean
  isOthers: boolean
}

const MonthViewWithData = ({
  today,
  monthToShow,
  isActive,
  onDateSelect,
  selectedDate,
  isReadOnly,
  isOthers,
}: Props) => {
  const isFutureMonth = monthToShow.getTime() > startOfMonth(today).getTime()
  const shouldFetch = !isFutureMonth && isActive
  const startDate = format(startOfMonth(monthToShow), 'yyyy-MM-dd')
  const endDate = isSameMonth(monthToShow, today)
    ? format(today, 'yyyy-MM-dd')
    : format(endOfMonth(monthToShow), 'yyyy-MM-dd')
  const [memberId] = useQueryState('memberId')
  const { data: myData } = useReadExerciseRange(
    startDate,
    endDate,
    shouldFetch && !isOthers,
  )
  const { data: othersData } = useReadMemberExerciseRange(
    memberId!,
    startDate,
    endDate,
    shouldFetch && isOthers,
  )
  const fetchedData = isOthers ? othersData : myData
  const swrKey = isOthers
    ? ['member/exerciseRange', memberId, startDate.substring(0, 7)]
    : ['exercise/range', startDate.substring(0, 7)]
  const { data: cachedData } = useSWR<ExerciseRange[]>(swrKey, null)
  const data = fetchedData || cachedData
  const counts: Record<string, number> = {}

  if (data) {
    data.forEach(({ date, record }) => {
      counts[date] = record
    })
  }

  const handleDateClick = (date: Date) => {
    if (onDateSelect) {
      onDateSelect(date)
    }
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
        isReadOnly={isReadOnly}
      />
    </div>
  )
}

export default MonthViewWithData
