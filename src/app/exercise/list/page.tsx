'use client'

import { useQueryState } from 'nuqs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Header from '@/components/commons/header'
import BottomButton from '@/components/commons/bottomButton'
import { useToast } from '@/hooks/useToast'
import { isValidYYYYMMDD } from '@/utils/validation'
import SITE_MAP from '@/constants/siteMap.constant'
import { useReadExerciseList } from '@/hooks/useExerciseApi'
import Typography from '@/components/ui/typography'
import useApiErrorHandler from '@/hooks/useApiErrorHandler'

import DateLabel from './_components/dateLabel'
import ExerciseCard from './_components/exerciseCard'
import styles from './list.module.css'

export default function List() {
  const [date, setDate] = useQueryState('date')
  const router = useRouter()
  const showToast = useToast()
  const handleApiError = useApiErrorHandler()
  const { data = [], error, isLoading } = useReadExerciseList(date ?? '')
  const invalidDate = !date || !isValidYYYYMMDD(date)

  useEffect(() => {
    if (invalidDate) {
      showToast('해당 운동 기록이 없습니다.', 'info')
      router.replace(SITE_MAP.TEMP1)
    }
  }, [invalidDate])

  useEffect(() => {
    if (!error) return
    const navigated = handleApiError(error)
    if (!navigated) router.back()
  }, [error])

  if (!date || isLoading || error) return null

  return (
    <div className={styles['container']}>
      <Header>운동 기록</Header>

      <DateLabel value={date} onChange={setDate} />

      {data.length === 0 ? (
        <div className={styles['empty-container']}>
          <Typography as="span" variant="text15" className={styles['text']}>
            아직 등록된 기록이 없습니다.
          </Typography>
        </div>
      ) : (
        <div className={styles['card-container']}>
          {data.map((record) => (
            <ExerciseCard
              key={record.exerciseId}
              exerciseId={record.exerciseId}
              title={record.title}
              category={record.category}
              startedAt={record.startedAt}
              endedAt={record.endedAt}
              images={record.images}
            />
          ))}
        </div>
      )}

      <BottomButton onClick={() => router.push(SITE_MAP.EXERCISE_CREATE)}>
        오늘 운동 기록하고 점수 얻기
      </BottomButton>
    </div>
  )
}
