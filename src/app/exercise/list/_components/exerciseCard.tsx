'use client'

import Image from 'next/image'

import { ExerciseFormValues } from '@/types/exercise'

// import styles from './exerciseCard.module.css'

// 운동기록 카드 임시 변경예정입니다. 타입도 api명세에 따라 변경할 예정입니다.
export default function ExerciseCard(record: ExerciseFormValues) {
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
