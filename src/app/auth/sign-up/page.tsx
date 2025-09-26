'use client'

import Typography from '@/components/ui/typography'

import ProfileForm from './_components/profileForm'
import styles from './signUp.module.css'

export default function SighUp() {
  return (
    <section className={styles['container']}>
      <Typography
        className={styles['title']}
        as="h1"
        variant="title-large"
        weight="bold"
      >
        회원가입을 위해
      </Typography>
      <Typography as="h1" variant="title-large" weight="bold">
        프로필 정보를 입력해주세요
      </Typography>
      <div className={styles['input-field']}>
        <ProfileForm />
      </div>
    </section>
  )
}
