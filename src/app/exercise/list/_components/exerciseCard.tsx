'use client'

import { useQueryState } from 'nuqs'
import Image from 'next/image'
import Link from 'next/link'

import { ExerciseList } from '@/types/exercise'
import DefaultImg from '@/assets/list_default_img.svg'
import Typography from '@/components/ui/typography'
import SITE_MAP from '@/constants/siteMap.constant'

import styles from './exerciseCard.module.css'

export default function ExerciseCard(props: ExerciseList) {
  const [date] = useQueryState('date')
  const formatedTime = `${props.startedAt.slice(11, 16)} ~ ${props.endedAt.slice(11, 16)}`

  return (
    <Link
      className={styles['container']}
      href={`${SITE_MAP.EXERCISE_DETAIL}?id=${props.exerciseId}&date=${date}`}
    >
      <div className={styles['img_container']}>
        {props.images[0] ? (
          <Image
            className={styles['exercise_img']}
            src={props.images[0]}
            alt="운동 사진"
            fill
          />
        ) : (
          <DefaultImg className={styles['default_img']} />
        )}
      </div>
      <div className={styles['text_container']}>
        <Typography
          as="span"
          variant="text18"
          weight="bold"
          className={styles['title']}
        >
          {props.title}
        </Typography>
        <Typography as="span" variant="text15" className={styles['time']}>
          {formatedTime}
        </Typography>
      </div>
    </Link>
  )
}
