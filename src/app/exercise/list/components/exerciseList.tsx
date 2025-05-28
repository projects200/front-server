'use client'

import { useQueryState } from 'nuqs'

import DateLabel from './dateLabel'
// import ExerciseCard from './exerciseCard'

export default function ExerciseList() {
  const [date, setDate] = useQueryState('date')
  return (
    <div>
      <DateLabel value={date} onChange={setDate} />
      {/* 기록 개수만큼 <ExerciseCard record={record}/> */}
    </div>
  )
}
