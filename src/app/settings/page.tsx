'use client'

import { useState } from 'react'

import { signOutRedirect } from '@/lib/auth'
import LegalDocModal from '@/components/commons/legalDocModal'
import Header from '@/components/commons/header'
import CenterModal from '@/components/commons/centerModal'
import Typography from '@/components/ui/typography'
import HelpIcon from '@/assets/icon_help.svg'
import LogoutIcon from '@/assets/icon_logout.svg'
import ImportanceIcon from '@/assets/icon_importance.svg'
import DocumentIcon from '@/assets/icon_document.svg'
import InfoIcon from '@/assets/icon_info.svg'
import BottomNavigation from '@/components/commons/bottomNavigation'
import { useDeleteFcmToken } from '@/hooks/useFcmApi'

import MenuItem from './_components/menuItem'
import styles from './settings.module.css'

const LEGAL_DOC_URLS = {
  TERMS: 'https://www.undabang.store/legal/terms-of-service.html',
  PRIVACY: 'https://www.undabang.store/legal/privacy-policy.html',
}

const GOOGLE_FORM_URLS = {
  SUPPORT: 'https://forms.gle/8b3kGK34PBfySBxm7',
  WITHDRAWAL: 'https://forms.gle/eiZW3iLYnsKjdPVr7',
}

export default function Settings() {
  const [isCenterModalOpen, setIsCenterModalOpen] = useState(false)
  const [legalDocUrl, setLegalDocUrl] = useState('')
  const { trigger: unregisterToken } = useDeleteFcmToken()

  const handleSignOut = async () => {
    const fcmToken = sessionStorage.getItem('fcm_token')
    sessionStorage.removeItem('fcm_token')
    if (fcmToken) {
      try {
        await unregisterToken(fcmToken)
      } catch {
        console.log('FCM 토큰 등록해제 오류')
      }
    }
    await signOutRedirect()
  }

  const handleLegalDocModal = (url: string) => {
    setLegalDocUrl(url)
  }

  const handleLinkInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <Header className="left-title">설정</Header>
      <div className={styles['container']}>
        <MenuItem
          icon={<HelpIcon className={styles['icon']} />}
          label="고객센터"
          onClick={() => handleLinkInNewTab(GOOGLE_FORM_URLS.SUPPORT)}
        />
        <MenuItem
          icon={<LogoutIcon className={styles['icon']} />}
          label="로그아웃"
          onClick={() => setIsCenterModalOpen(true)}
        />
        <MenuItem
          icon={<ImportanceIcon className={styles['icon']} />}
          label="회원탈퇴신청"
          onClick={() => handleLinkInNewTab(GOOGLE_FORM_URLS.WITHDRAWAL)}
        />
        <MenuItem
          icon={<DocumentIcon className={styles['icon']} />}
          label="이용약관"
          onClick={() => handleLegalDocModal(LEGAL_DOC_URLS.TERMS)}
        />
        <MenuItem
          icon={<DocumentIcon className={styles['icon']} />}
          label="개인정보 처리방침"
          onClick={() => handleLegalDocModal(LEGAL_DOC_URLS.PRIVACY)}
        />
        <MenuItem
          icon={<InfoIcon className={styles['icon']} />}
          label="버전정보"
          rightText="1.0.0"
        />
      </div>

      {/* 로그아웃 */}
      <CenterModal
        isOpen={isCenterModalOpen}
        onClose={() => {
          setIsCenterModalOpen(false)
        }}
        onConfirm={() => handleSignOut()}
      >
        <Typography as="span" variant="text15" weight="bold">
          로그아웃 하시겠습니까?
        </Typography>
      </CenterModal>

      <BottomNavigation />

      {/* 각종 약관 */}
      {legalDocUrl && (
        <LegalDocModal
          src={legalDocUrl}
          onClose={() => {
            handleLegalDocModal('')
          }}
        />
      )}
    </>
  )
}
