'use client'

import Image from 'next/image'
import clsx from 'clsx'

import { redirectToSocialLogin } from '@/lib/auth'
import Typography from '@/components/ui/typography'
import GoogleIcon from '@/assets/icon_google.svg'
import KakaoIcon from '@/assets/icon_kakao.svg'

import styles from './login.module.css'


export default function Login() {
  return (
    <section className={styles['container']}>
      <Image
        priority
        className={styles['logo']}
        src="logo.svg"
        alt="로고"
        width={150}
        height={150}
      />
      <Typography
        className={styles['title']}
        as="div"
        variant="text32"
        weight="bold"
      >
        운 다 방
      </Typography>
      <button
        className={`${styles['button']} ${styles['kakao']}`}
        onClick={() => redirectToSocialLogin('kakao')}
      >
        <KakaoIcon className={styles['icon']} width={24} height={24} />
        <Typography className={styles['text']} variant="text18" weight="medium">
          카카오 로그인
        </Typography>
      </button>
      <button
        className={clsx(styles['button'], styles['google'])}
        onClick={() => redirectToSocialLogin('Google')}
      >
        <GoogleIcon className={styles['icon']} width={24} height={24} />
        <Typography className={styles['text']} variant="text18" weight="medium">
          구글 로그인
        </Typography>
      </button>
    </section>
  )
}
