'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BottomButton from '@/components/ui/bottomButton'
import Typography from '@/components/ui/typography'
import AgreementItem from './components/agreementItem'
import styles from './agreement.module.css'
import SITE_MAP from '@/constants/siteMap.constant'

export default function Agreement() {
  const [checkedTerms, setCheckedTerms] = useState(false)
  const [checkedPrivacy, setCheckedPrivacy] = useState(false)
  const router = useRouter()
  const isValid = checkedTerms && checkedPrivacy

  return (
    <section className={styles['container']}>
      <Typography
        className={styles['title']}
        as="h1"
        variant="text24"
        weight="bold"
      >
        환영합니다!
      </Typography>
      <Typography as="h1" variant="text24" weight="bold">
        아래의 약관에 동의해주세요
      </Typography>
      <div className={styles['agreement-item-list']}>
        <AgreementItem
          label="(필수) 이용약관"
          checked={checkedTerms}
          onToggle={() => setCheckedTerms(!checkedTerms)}
          onClickLabel={() => console.log('이용약관 모달')}
        />
        <AgreementItem
          label="(필수) 개인정보수집이용동의"
          checked={checkedPrivacy}
          onToggle={() => setCheckedPrivacy(!checkedPrivacy)}
          onClickLabel={() => console.log('개인정보수집이용동의 모달')}
        />
      </div>
      <BottomButton
        variant="primary"
        onClick={() => router.push(SITE_MAP.SIGHUP)}
        disabled={!isValid}
      >
        확인
      </BottomButton>
    </section>
  )
}
