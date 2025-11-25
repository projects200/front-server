'use client'

import { PreferExercises } from '@/types/mypage'
import ExerciseImg from '@/components/commons/exerciseImg'
import Typography from '@/components/ui/typography'
import {
  formatSkillLevelToKo,
  formatDaysOfWeek,
} from '@/utils/formatting/preferExercise'

import styles from './preferExerciseItem.module.css'

type Props = {
  data: PreferExercises
}

export default function PreferExerciseItem({ data }: Props) {
  return (
    <div className={styles['container']}>
      <ExerciseImg imageUrl={data.imageUrl} />
      <div className={styles['exercise-info']}>
        <Typography as="div" variant="content-medium">
          {data.name}
        </Typography>
        <Typography
          className={styles['days-of-week']}
          as="div"
          variant="content-small"
        >
          {formatDaysOfWeek(data.daysOfWeek)}
        </Typography>
      </div>

      <Typography
        className={styles['exercise-level']}
        as="p"
        variant="content-medium"
      >
        {formatSkillLevelToKo(data.skillLevel)}
      </Typography>
    </div>
  )
}
