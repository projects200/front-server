'use client'

import { useReadExerciseList } from '@/hooks/api/useExerciseApi'
import Typography from '@/components/ui/typography'

import ExerciseCard from './exerciseCard'
import styles from './exerciseList.module.css'

type Props = {
  selectedDate: string
}

export default function ExerciseList({ selectedDate }: Props) {
  const { data: exerciseList = [] } = useReadExerciseList(selectedDate, true)

  return (
    <div className={styles['container']}>
      {exerciseList.length === 0 ? (
        <div className={styles['empty-container']}>
          <Typography
            as="span"
            variant="content-large"
            className={styles['text']}
          >
            이 날짜에 등록된 기록이 없습니다.
          </Typography>
        </div>
      ) : (
        <div className={styles['card-container']}>
          {exerciseList.map((record) => (
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
    </div>
  )
}
