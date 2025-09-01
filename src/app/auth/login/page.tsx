'use client'

import clsx from 'clsx'

import { redirectToSocialLogin } from '@/lib/auth'
import Typography from '@/components/ui/typography'
import GoogleIcon from '@/assets/icon_google.svg'
import KakaoIcon from '@/assets/icon_kakao.svg'
import Logo from '@/assets/logo.svg'
import GoogleStoreIcon from '@/assets/icon_google_play.svg'
import IOSIcon from '@/assets/icon_iOS.svg'
import Button from '@/components/ui/button'

import styles from './login.module.css'

export default function Login() {
  return (
    <section className={styles['container']}>
      <Logo className={styles['logo']} width={150} height={150} />
      <Typography
        className={styles['title']}
        as="div"
        variant="text32"
        weight="bold"
      >
        운 다 방
      </Typography>
      <button
        className={clsx(styles['button'], styles['kakao'])}
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
      <div className={styles['store-section']}>
        <button
          className={styles['store-button']}
          onClick={() =>
            window.open(
              'https://play.google.com/store/apps/details?id=com.project200.undabang',
              '_blank',
            )
          }
        >
          <GoogleStoreIcon className={styles['store-icon']} />
          <div className={styles['text-section']}>
            <Typography
              className={styles['button-sub-title']}
              as="span"
              variant="text8"
              weight="bold"
            >
              GET IT ON
            </Typography>
            <Typography
              className={styles['button-title']}
              as="span"
              variant="text14"
              weight="bold"
            >
              Google Play
            </Typography>
          </div>
        </button>
        <button
          className={styles['store-button']}
          onClick={() => alert('pwa다운안내페이지로 이동')}
        >
          <IOSIcon className={styles['store-icon']} />
          <div className={styles['text-section']}>
            <Typography
              className={styles['button-sub-title']}
              as="span"
              variant="text8"
              weight="bold"
            >
              Download on the
            </Typography>
            <Typography
              className={styles['button-title']}
              as="span"
              variant="text14"
              weight="bold"
            >
              PWA APP
            </Typography>
          </div>
        </button>
      </div>
    </section>
  )
}
