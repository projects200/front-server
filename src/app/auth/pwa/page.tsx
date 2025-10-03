'use client'

import Image from 'next/image'

import Header from '@/components/commons/header'
import IOSDownload from '@/assets/icon_iOS_download.svg'
import Step1Img from '@/assets/pwa_step1.png'
import Step2Img from '@/assets/pwa_step2.png'
import Step3Img from '@/assets/pwa_step3.png'
import Typography from '@/components/ui/typography'

import styles from './pwa.module.css'

export default function Pwa() {
  return (
    <>
      <Header>iOS App Download</Header>
      <div className={styles['step-section']}>
        <Typography
          className={styles['title']}
          as="span"
          variant="title-medium"
          weight="bold"
        >
          Step 1
        </Typography>

        <Typography
          className={styles['sub-title']}
          as="span"
          variant="content-large"
        >
          하단 중앙의 <IOSDownload className={styles['icon']} /> 아이콘을
          눌러주세요
        </Typography>
        <Image className={styles['img']} src={Step1Img} alt="PWA 설치 단계 1" />
        <Typography
          className={styles['title']}
          as="span"
          variant="title-medium"
          weight="bold"
        >
          Step 2
        </Typography>
        <Typography
          className={styles['sub-title']}
          as="span"
          variant="content-large"
        >
          홈 화면에 추가 버튼을 눌러주세요
        </Typography>
        <Image className={styles['img']} src={Step2Img} alt="PWA 설치 단계 2" />
        <Typography
          className={styles['title']}
          as="span"
          variant="title-medium"
          weight="bold"
        >
          Step 3
        </Typography>
        <Typography
          className={styles['sub-title']}
          as="span"
          variant="content-large"
        >
          앱 이름을 설정하고 추가 버튼을 눌러주세요
        </Typography>
        <Image className={styles['img']} src={Step3Img} alt="PWA 설치 단계 3" />
      </div>
    </>
  )
}
