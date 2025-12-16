'use client'

import clsx from 'clsx'

import { ExerciseItem, PreferExercises } from '@/types/mypage'
import CheckIcon from '@/assets/icon_check.svg'
import Typography from '@/components/ui/typography'

import styles from './selectionStep.module.css'

type Props = {
  nickName: string
  allExercises: ExerciseItem[]
  selectedExercises: PreferExercises[]
  onToggle: (item: ExerciseItem) => void
}

export default function SelectionStep({
  nickName,
  allExercises,
  selectedExercises,
  onToggle,
}: Props) {
  return (
    <div className={styles['content']}>
      <Typography as="h1" variant="content-large" weight="bold">
        {`${nickName}님, 선호하시는 운동을 선택해 주세요.`}
      </Typography>
      <Typography className={styles['sub-text']} as="p" variant="content-small">
        *선호운동은 최대 5개까지 선택 가능해요.
      </Typography>

      <div className={styles['list-container']}>
        {allExercises.map((exercise) => {
          const isSelected = selectedExercises.some(
            (e) => e.exerciseTypeId === exercise.exerciseTypeId,
          )

          return (
            <button
              key={`exercise-${exercise.exerciseTypeId}`}
              type="button"
              className={clsx(styles['item'], {
                [styles['selected']]: isSelected,
              })}
              onClick={() => onToggle(exercise)}
            >
              {isSelected && <CheckIcon className={styles['check-icon']} />}
              <Typography as="p" variant="content-medium" weight="bold">
                {exercise.name}
              </Typography>
            </button>
          )
        })}
      </div>
    </div>
  )
}
