'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import LegalDocModal from '@/components/commons/legalDocModal'
import BottomButton from '@/components/commons/bottomButton'
import Typography from '@/components/ui/typography'
import SITE_MAP from '@/constants/siteMap.constant'

import AgreementItem from './_components/agreementItem'
import styles from './agreement.module.css'

const LEGAL_DOC_URLS = {
  TERMS: 'https://www.undabang.store/legal/terms-of-service.html',
  PRIVACY: 'https://www.undabang.store/legal/privacy-policy.html',
}

export default function Agreement() {
  const [checkedTerms, setCheckedTerms] = useState(false)
  const [checkedPrivacy, setCheckedPrivacy] = useState(false)
  const [legalDocUrl, setLegalDocUrl] = useState('')
  const router = useRouter()
  const isValid = checkedTerms && checkedPrivacy

  const openLegalDocModal = (url: string) => {
    setLegalDocUrl(url)
  }

  const closeLegalDocModal = () => {
    setLegalDocUrl('')
  }

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
          onClickLabel={() => openLegalDocModal(LEGAL_DOC_URLS.TERMS)}
        />
        <AgreementItem
          label="(필수) 개인정보수집이용동의"
          checked={checkedPrivacy}
          onToggle={() => setCheckedPrivacy(!checkedPrivacy)}
          onClickLabel={() => openLegalDocModal(LEGAL_DOC_URLS.PRIVACY)}
        />
      </div>
      <BottomButton
        variant="primary"
        onClick={() => router.push(SITE_MAP.SIGHUP)}
        disabled={!isValid}
      >
        확인
      </BottomButton>
      {/* 각종 약관 */}
      {legalDocUrl && (
        <LegalDocModal src={legalDocUrl} onClose={closeLegalDocModal} />
      )}
    </section>
  )
}
