'use client'

import Image from 'next/image'
import { redirectToSocialLogin } from '@/lib/auth'
import styles from './login.module.css'

import Typography from '@/components/ui/typography'
import GoogleLogo from '@/assets/icon_google.svg'
import KakaoLogo from '@/assets/icon_kakao.svg'

export default function Login() {
  return (
    <section className={styles.container}>
      <Image
        className={styles.logo}
        src="logo.svg"
        alt="로고"
        width={200}
        height={200}
      />
      <Typography className={styles.title} variant="text32">
        운 다 방
      </Typography>
      <button
        className={`${styles.button} ${styles.kakao}`}
        onClick={() => redirectToSocialLogin('kakao')}
      >
        <KakaoLogo className={styles.icon} width={24} height={24} />
        <Typography className={styles.text} variant="text18">
          카카오 로그인
        </Typography>
      </button>
      <button
        className={`${styles.button} ${styles.google}`}
        onClick={() => redirectToSocialLogin('Google')}
      >
        <GoogleLogo className={styles.icon} width={24} height={24} />
        <Typography className={styles.text} variant="text18">
          구글 로그인
        </Typography>
      </button>
    </section>
  )
}
