'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { memo, useEffect, useState } from 'react'

import DefaultExerciseIMage from '@/assets/default_exercise_image.svg'

import styles from './exerciseImg.module.css'

type Props = {
  className?: string
  imageUrl: string | null
}

function ExerciseImg({ className, imageUrl }: Props) {
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    setImgError(false)
  }, [imageUrl])

  const showDefault = !imageUrl || imgError

  return (
    <div className={clsx(styles['exercise-container'], className)}>
      {showDefault ? (
        <DefaultExerciseIMage className={styles['exercise-img']} />
      ) : (
        <Image
          className={styles['exercise-img']}
          src={imageUrl}
          alt="운동 이미지"
          fill
          onError={() => setImgError(true)}
        />
      )}
    </div>
  )
}

export default memo(ExerciseImg)
