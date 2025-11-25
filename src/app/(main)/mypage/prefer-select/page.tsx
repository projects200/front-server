'use client'

import { useSearchParams } from 'next/navigation'

import styles from './preferSelect.module.css'

export default function PreferSelect() {
  const searchParams = useSearchParams()

  const nickName = searchParams.get('nickName')
  return (
    <div className={styles['container']}>
      {`${nickName} 6-5. 선호운동 종류 선택 임시페이지`}
    </div>
  )
}
