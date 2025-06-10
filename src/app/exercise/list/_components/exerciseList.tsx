'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useReadExerciseList } from '@/hooks/useExerciseApi'
import Typography from '@/components/ui/typography'
import useApiErrorHandler from '@/hooks/useApiErrorHandler'

import ExerciseCard from './exerciseCard'
import styles from './exerciseList.module.css'

type Props = {
  date: string
}

export default function ExerciseList({ date }: Props) {
  const handleError = useApiErrorHandler()
  const router = useRouter()
  const { data, error, isLoading } = useReadExerciseList(date)

  useEffect(() => {
    if (!error) return
    const navigated = handleError(error)
    if (!navigated) router.back()
  }, [error])

  if (isLoading || error) return null
  if (!data || data.length === 0)
    return (
      <div className={styles['container']}>
        <Typography className={styles['text']} as="span" variant="text15">
          아직 등록된 기록이 없습니다.
        </Typography>
      </div>
    )

  return (
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
  )
}
