'use client'

import clsx from 'clsx'

import { PreferExercises } from '@/types/mypage'
import ExerciseImg from '@/components/commons/exerciseImg'
import Typography from '@/components/ui/typography'
import {
  formatSkillLevelToKo,
  formatDaysOfWeek,
} from '@/utils/formatting/preferExercise'

import styles from './detailStep.module.css'

const WEEK_DAYS = ['월', '화', '수', '목', '금', '토', '일']
const SKILL_LEVELS = [
  'NOVICE',
  'BEGINNER',
  'INTERMEDIATE',
  'ADVANCED',
  'EXPERT',
  'PROFESSIONAL',
]

type Props = {
  myExercises: PreferExercises[]
  onUpdateDay: (exerciseIndex: number, dayIndex: number) => void
  onUpdateSkill: (exerciseIndex: number, skillLevel: string) => void
}

export default function DetailStep({
  myExercises,
  onUpdateDay,
  onUpdateSkill,
}: Props) {
  return (
    <div className={styles['content']}>
      <div className={styles['list-container']}>
        {myExercises.map((exercise, index) => (
          <div
            key={`card-${exercise.exerciseTypeId}`}
            className={styles['card']}
          >
            <div className={styles['card-header']}>
              <ExerciseImg
                className={styles['exercise-img']}
                imageUrl={exercise.imageUrl}
              />
              <div className={styles['header-info']}>
                <Typography as="h2" variant="title-medium" weight="bold">
                  {exercise.name}
                </Typography>
                <Typography
                  className={styles['sub-text']}
                  variant="content-small"
                >
                  {`${formatDaysOfWeek(exercise.daysOfWeek) || '요일 미선택'} · ${formatSkillLevelToKo(exercise.skillLevel) || '숙련도 미선택'}`}
                </Typography>
              </div>
            </div>

            {/* 운동 주기 선택 */}
            <div className={styles['card-body']}>
              <Typography
                as="p"
                variant="content-medium"
                weight="bold"
                className={styles['label']}
              >
                운동 주기
              </Typography>
              <div className={styles['day-group']}>
                {WEEK_DAYS.map((day, dayIndex) => (
                  <button
                    key={`${exercise.exerciseTypeId}-day-${dayIndex}`}
                    className={clsx(
                      styles['day-chip'],
                      exercise.daysOfWeek[dayIndex] && styles['selected'],
                    )}
                    onClick={() => onUpdateDay(index, dayIndex)}
                  >
                    <Typography
                      as="span"
                      variant="content-medium"
                      weight="bold"
                    >
                      {day}
                    </Typography>
                  </button>
                ))}
              </div>
            </div>

            {/* 숙련도 선택 */}
            <div className={styles['card-body']}>
              <Typography
                as="p"
                variant="content-medium"
                weight="bold"
                className={styles['label']}
              >
                숙련도
              </Typography>
              <div className={styles['skill-group']}>
                {SKILL_LEVELS.map((level) => (
                  <button
                    key={`${exercise.exerciseTypeId}-skill-${level}`}
                    className={clsx(
                      styles['skill-chip'],
                      exercise.skillLevel === level && styles['selected'],
                    )}
                    onClick={() => onUpdateSkill(index, level)}
                  >
                    <Typography
                      as="span"
                      variant="content-medium"
                      weight="bold"
                    >
                      {formatSkillLevelToKo(level)}
                    </Typography>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
