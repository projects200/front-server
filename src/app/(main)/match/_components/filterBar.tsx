'use client'

import ResetIcon from '@/assets/icon-reset.svg'
import SingleSelectFilter from '@/components/ui/singleSelectFilter'
import MultiSelectFilter from '@/components/ui/multiSelectFilter'
import Typography from '@/components/ui/typography'

import styles from './filterBar.module.css'

// 필터 옵션 상수
const GENDER_OPTIONS = ['남성', '여성']
const AGE_OPTIONS = ['10대', '20대', '30대', '40대', '50대', '60대 이상']
const SPORT_OPTIONS = ['헬스', '필라테스', '러닝', '클라이밍', '골프']
const SKILL_OPTIONS = ['입문', '초급', '중급', '고급', '숙련', '선출']
const WEEKDAY_OPTIONS = [
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
  '일요일',
]
const SCORE_OPTIONS = ['20점 이상', '40점 이상', '60점 이상', '80점 이상']

export type FilterItems = {
  gender: string | null
  age: string | null
  sport: string | null
  skill: string | null
  workoutDays: string[]
  score: string | null
}

type Props = {
  filters: FilterItems
  onFilterChange: <K extends keyof FilterItems>(
    key: K,
    value: FilterItems[K],
  ) => void
  onReset: () => void
}

export default function FilterBar({ filters, onFilterChange, onReset }: Props) {
  return (
    <div className={styles['container']}>
      <button className={styles['reset']} onClick={onReset}>
        <Typography as="span" variant="content-medium">
          초기화
        </Typography>
        <ResetIcon />
      </button>
      <SingleSelectFilter
        label="성별"
        options={GENDER_OPTIONS}
        value={filters.gender}
        onChange={(value) => onFilterChange('gender', value)}
      />
      <SingleSelectFilter
        label="나이"
        options={AGE_OPTIONS}
        value={filters.age}
        onChange={(value) => onFilterChange('age', value)}
      />
      <SingleSelectFilter
        label="종목"
        options={SPORT_OPTIONS}
        value={filters.sport}
        onChange={(value) => onFilterChange('sport', value)}
      />
      <SingleSelectFilter
        label="숙련도"
        options={SKILL_OPTIONS}
        value={filters.skill}
        onChange={(value) => onFilterChange('skill', value)}
      />
      <MultiSelectFilter
        label="운동 요일"
        options={WEEKDAY_OPTIONS}
        value={filters.workoutDays}
        onChange={(value) => onFilterChange('workoutDays', value)}
      />
      <SingleSelectFilter
        label="운동 점수"
        options={SCORE_OPTIONS}
        value={filters.score}
        onChange={(value) => onFilterChange('score', value)}
      />
    </div>
  )
}
