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
  const ExerciseImageComponent = () => {
    if (imageUrl) {
      return (
        <Image
          className={styles['exercise-img']}
          src={imageUrl}
          alt="운동 이미지"
          fill
        />
      )
    } else {
      return <DefaultExerciseIMage className={styles['exercise-img']} />
    }
  }

  return (
    <div className={clsx(className, styles['exercise-container'])}>
      <ExerciseImageComponent />
    </div>
  )
}

export default memo(ExerciseImg)
