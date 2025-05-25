'use client'

import Image from 'next/image'

import { Exercise } from '@/types/exercise'

// import styles from './exerciseCard.module.css'

type ExerciseCardProps = {
  record: Exercise
}

// 운동기록 카드 임시 디자인 변경예정
export default function ExerciseCard({ record }: ExerciseCardProps) {
  return (
    <div>
      {record.images?.[0] && (
        <Image
          src={URL.createObjectURL(record.images[0])}
          alt="운동 이미지"
          width={50}
          height={50}
        />
      )}
      <div>{record.title}</div>
      <div>{record.category}</div>
      <div>{record.category}</div>
      <div>{record.category}</div>
    </div>
  )
}
