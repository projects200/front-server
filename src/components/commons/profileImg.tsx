'use client'

import Image from 'next/image'

import DefaultProfile from '@/assets/default_profile.svg'

import styles from './profileImg.module.css'

type Props = {
  profileThumbnailUrl: string | null
  profileImageUrl: string | null
}

export default function ProfileImg({
  profileThumbnailUrl,
  profileImageUrl,
}: Props) {
  const Profile = () => {
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
  return <Profile />
}
