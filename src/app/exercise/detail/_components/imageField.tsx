'use client'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Image from 'next/image'

import { ExercisePictures } from '@/types/exercise'

import styles from './imageField.module.css'

export default function ImageField({ images }: ExercisePictures) {
  if (!images?.length) return null

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      swipeable
      emulateTouch
      infiniteLoop={false}
      className={styles['carousel']}
    >
      {images.map((img) => (
        <div
          key={img.pictureId}
          className={styles['slide']}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        >
          <Image
            className={styles['img']}
            src={img.pictureUrl}
            alt={img.pictureName}
            fill
            priority
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      ))}
    </Carousel>
  )
}
