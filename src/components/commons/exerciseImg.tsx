'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { memo } from 'react'

import DefaultExerciseIMage from '@/assets/default_exercise_image.svg'

import styles from './exerciseImg.module.css'

type Props = {
  className?: string
  imageUrl: string | null
}

function ExerciseImg({ className, imageUrl }: Props) {
  return (
    <div className={clsx(className, styles['exercise-container'])}>
      {imageUrl ? (
        <Image
          className={styles['exercise-img']}
          src={imageUrl}
          alt="운동 이미지"
          fill
        />
      ) : (
        <DefaultExerciseIMage className={styles['exercise-img']} />
      )}
    </div>
  )
}

export default memo(ExerciseImg)
