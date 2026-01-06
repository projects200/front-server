import { useMemo } from 'react'
import { format, startOfMonth, endOfMonth, isSameMonth } from 'date-fns'
import useSWR from 'swr'

import { useReadExerciseRange } from '@/hooks/api/useExerciseApi'
import { useReadMemberExerciseRange } from '@/hooks/api/useMemberApi'
import type { ExerciseRange } from '@/types/exercise'

type Props = {
  monthToShow: Date
  today: Date
  isOthers: boolean
  memberId?: string
  isActive: boolean
  showStamps: boolean
}

export const useExerciseCalendarData = ({
  monthToShow,
  today,
  isOthers,
  memberId,
  isActive,
  showStamps,
}: Props) => {
  const isFutureMonth = monthToShow.getTime() > startOfMonth(today).getTime()
  const startDate = format(startOfMonth(monthToShow), 'yyyy-MM-dd')
  const endDate = isSameMonth(monthToShow, today)
    ? format(today, 'yyyy-MM-dd')
    : format(endOfMonth(monthToShow), 'yyyy-MM-dd')

  const shouldFetch = !isFutureMonth && isActive && showStamps

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

  const counts = useMemo(() => {
    if (!data) return {}

    return Object.fromEntries(data.map(({ date, record }) => [date, record]))
  }, [data])

  return { counts }
}
