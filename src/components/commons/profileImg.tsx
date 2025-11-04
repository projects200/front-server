'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { memo } from 'react'

import DefaultProfile from '@/assets/default_profile.svg'
import PlusIcon from '@/assets/icon_img_plus.svg'

import styles from './profileImg.module.css'

type Props = {
  className?: string
  profileThumbnailUrl: string | null
  profileImageUrl: string | null
  mode: 'view' | 'edit'
  onClick?: () => void
}

function ProfileImg({
  className,
  profileThumbnailUrl,
  profileImageUrl,
  mode,
  onClick,
}: Props) {
  // 썸내일 -> 원본이미지 -> 기본이미지 순서대로 표시
  const ProfileImageComponent = () => {
    if (profileThumbnailUrl) {
      return (
        <Image
          className={styles['profile-img']}
          src={profileThumbnailUrl}
          alt="프로필 사진"
          fill
        />
      )
    } else if (profileImageUrl) {
      return (
        <Image
          className={styles['profile-img']}
          src={profileImageUrl}
          alt="프로필 사진"
          fill
        />
      )
    } else {
      return <DefaultProfile className={styles['profile-img']} />
    }
  }

  return (
    <button
      type="button"
      className={clsx(className, styles['profile-container'])}
      onClick={onClick}
    >
      <ProfileImageComponent />
      {mode === 'edit' && <PlusIcon className={styles['edit-icon']} />}
    </button>
  )
}

export default memo(ProfileImg)
