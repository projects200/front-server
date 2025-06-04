'use client'
import { useQueryState, parseAsInteger } from 'nuqs'
import { useState, useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'

import Header from '@/components/commons/header'
import KebabIcon from '@/assets/icon_kebab.svg'
import { useToast } from '@/hooks/useToast'
import SITE_MAP from '@/constants/siteMap.constant'

import ExerciseDetail from './_components/exerciseDetail'
import KebabModal from './_components/kebabModal'
import styles from './detail.module.css'

export default function Detail() {
  const [isBottomModalOpen, setIsBottomModalOpen] = useState(false)
  const [exerciseId] = useQueryState('id', parseAsInteger)
  const router = useRouter()
  const showToast = useToast()

  useLayoutEffect(() => {
    if (exerciseId === null) {
      showToast('해당 운동 기록이 없습니다.', 'info')
      router.replace(SITE_MAP.EXERCISE_LIST)
    }
  }, [])

  if (exerciseId === null) return null
  return (
    <>
      <Header
        rightIcon={<KebabIcon className={styles['header-icon']} />}
        onClick={() => setIsBottomModalOpen(true)}
      >
        기록 상세
      </Header>
      <ExerciseDetail exerciseId={exerciseId} />
      <KebabModal
        isOpen={isBottomModalOpen}
        setIsOpen={setIsBottomModalOpen}
        exerciseId={exerciseId}
      />
    </>
  )
}
