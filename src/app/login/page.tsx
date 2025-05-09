'use client'

import Image from 'next/image'

import { redirectToSocialLogin } from '@/lib/auth'
import styles from './login.module.css'

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.logoBox}>
          <Image src="logo.svg" alt="로고" fill />
        </div>
        <h1 className={styles.title}>운 다 방</h1>
      </div>
      <button
        className={`${styles.button} ${styles.kakao}`}
        onClick={() => redirectToSocialLogin('kakao')}
      >
        <Image
          className={styles.icon}
          src="icon_kakao.svg"
          alt="로고"
          width={30}
          height={30}
        />
        <span className={styles.text}>카카오 로그인</span>
      </button>
      <button
        className={`${styles.button} ${styles.google}`}
        onClick={() => redirectToSocialLogin('Google')}
      >
        <Image
          className={styles.icon}
          src="icon_google.svg"
          alt="로고"
          width={30}
          height={30}
        />
        <span className={styles.text}>구글 로그인</span>
      </button>
    </div>
  )
}
