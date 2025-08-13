'use client'

import Header from '@/components/commons/header'
import CompleteButton from '@/components/commons/completeButton'

import styles from './create.module.css'

export default function Create() {
  return (
    <>
      <Header rightIcon={<CompleteButton />} onClick={() => {}}>
        타이머 생성
      </Header>

      <div className={styles['title-section']}>
        <input
          className={styles['title-input']}
          type="text"
          placeholder="나만의 타이머 이름"
        />
      </div>
    </>
  )
}
