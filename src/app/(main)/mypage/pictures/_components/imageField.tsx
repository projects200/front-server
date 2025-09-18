'use client'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Image from 'next/image'

import { ProfileImgInfo } from '@/types/profile'

import styles from './imageField.module.css'

type Props = {
  images: ProfileImgInfo[]
  selectedIndex: number
  onSlideChange: (index: number) => void
}

export default function ImageField({
  images,
  selectedIndex,
  onSlideChange,
}: Props) {
  if (!images?.length) return null

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      swipeable
      emulateTouch
      infiniteLoop={false}
      className={styles['carousel']}
      showIndicators={false}
      selectedItem={selectedIndex}
      onChange={onSlideChange}
    >
      {images.map((img) => (
        <div key={`profile-${img.pictureId}`} className={styles['slide']}>
          <Image
            className={styles['img']}
            src={img.profileImageUrl}
            alt={img.profileImageName}
            fill
            priority
          />
        </div>
      ))}
    </Carousel>
  )
}
