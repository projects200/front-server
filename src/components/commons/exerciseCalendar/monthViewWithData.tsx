'use client'

import { useExerciseCalendarData } from '@/hooks/useExerciseCalendar'

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
  showStamps: boolean
  memberId?: string
}

const MonthViewWithData = ({
  today,
  monthToShow,
  isActive,
  onDateSelect,
  selectedDate,
  isReadOnly,
  isOthers,
  showStamps,
  memberId,
}: Props) => {
  const { counts } = useExerciseCalendarData({
    monthToShow,
    today,
    isOthers,
    memberId,
    isActive,
    showStamps,
  })

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
        counts={showStamps ? counts : {}}
        onDateClick={handleDateClick}
        selectedDate={selectedDate}
        isReadOnly={isReadOnly}
        showStamps={showStamps}
      />
    </div>
  )
}

export default MonthViewWithData
