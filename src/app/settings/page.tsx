'use client'

import { signOutRedirect } from '@/lib/auth'
import ProtectedRoute from '@/components/commons/protectedRoute'
import SITE_MAP from '@/constants/siteMap.constant'
import Header from '@/components/commons/header'
import MenuItem from './components/menuItem'

import HelpIcon from '@/assets/icon_help.svg'
import LogoutIcon from '@/assets/icon_logout.svg'
import ImportanceIcon from '@/assets/icon_importance.svg'
import DocumentIcon from '@/assets/icon_document.svg'
import InfoIcon from '@/assets/icon_info.svg'

import styles from './settings.module.css'

export default function Settings() {
  const handleSignOut = async () => {
    await signOutRedirect()
  }
  return (
    <ProtectedRoute>
      <Header title="설정" />
      <div className={styles['container']}>
        {/* <MenuItem
          icon={<HelpIcon className={styles['icon']} />}
          label="고객센터"
          onClick={() => {}}
        /> */}
        <MenuItem
          icon={<LogoutIcon className={styles['icon']} />}
          label="로그아웃"
          onClick={handleSignOut}
        />
        <MenuItem
          icon={<ImportanceIcon className={styles['icon']} />}
          label="회원탈퇴신청"
          onClick={() => {}}
        />
        <MenuItem
          icon={<DocumentIcon className={styles['icon']} />}
          label="이용약관"
          onClick={() => {}}
        />
        <MenuItem
          icon={<DocumentIcon className={styles['icon']} />}
          label="개인정보 처리방침"
          onClick={() => {}}
        />
        <MenuItem
          icon={<InfoIcon className={styles['icon']} />}
          label="버전정보"
          rightText="1.0.0"
        />
      </div>
    </ProtectedRoute>
  )
}
