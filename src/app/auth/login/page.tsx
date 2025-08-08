'use client'

import clsx from 'clsx'

import { redirectToSocialLogin } from '@/lib/auth'
import Typography from '@/components/ui/typography'
import GoogleIcon from '@/assets/icon_google.svg'
import KakaoIcon from '@/assets/icon_kakao.svg'
import Logo from '@/assets/logo.svg'

import styles from './login.module.css'

// 임시 알람 요청 테스트코드
import { requestFcmToken } from '@/lib/firebase/config'

export default function Login() {
  // 임시 알람 요청 테스트코드
  const handleTestClick = async () => {
    const token = await requestFcmToken()
    if (token) {
      console.log('발급 토큰 : ', token)
      alert('토큰 발급 성공')
    } else {
      alert('토큰 발급 실패')
    }
  }
  return (
    <section className={styles['container']}>
      {/* 임시로 테스트를 위해 로고 클릭시 fcm토큰 요청하도록 구현했습니다. */}
      <Logo
        className={styles['logo']}
        width={150}
        height={150}
        onClick={handleTestClick}
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
