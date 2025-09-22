'use client'

import { mutate } from 'swr'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

import { useToast } from '@/hooks/useToast'
import { useDeleteExercise } from '@/hooks/api/useExerciseApi'
import BottomModal from '@/components/commons/bottomModal'
import CenterModal from '@/components/commons/centerModal'
import EditIcon from '@/assets/icon_edit.svg'
import TrashIcon from '@/assets/icon_trash.svg'
import Typography from '@/components/ui/typography'
import SITE_MAP from '@/constants/siteMap.constant'

import styles from './kebabmodal.module.css'

type Props = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  exerciseId: number
  startedAt: string
}

export default function KebabModal({
  isOpen,
  setIsOpen,
  exerciseId,
  startedAt,
}: Props) {
  const [isOpenCenter, setIsOpenCenter] = useState(false)
  const showToast = useToast()
  const router = useRouter()

  const { trigger: deleteExercise } = useDeleteExercise(exerciseId)

  const handleRemove = async () => {
    try {
      await deleteExercise(null)
      showToast('운동 기록이 삭제되었습니다.', 'info')

      await Promise.all([
        mutate(['exercise/range'], startedAt.substring(0, 7)),
        mutate(['exercise/list'], startedAt.substring(0, 10)),
      ])

      router.back()
    } catch {
      return
    }
  }

  return (
    <>
      <BottomModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
      >
        <div className={styles['button-group']}>
          <Link
            className={styles['button']}
            href={`${SITE_MAP.EXERCISE_EDIT}?id=${exerciseId}`}
          >
            <EditIcon className={styles['modal-icon']} />
            <Typography as="span" variant="text15">
              수정하기
            </Typography>
          </Link>
          <button
            className={styles['button']}
            onClick={() => {
              setIsOpen(false)
              setIsOpenCenter(true)
            }}
          >
            <TrashIcon className={styles['modal-icon']} />
            <Typography className={styles['remove']} as="span" variant="text15">
              삭제하기
            </Typography>
          </button>
        </div>
      </BottomModal>
      <CenterModal
        isOpen={isOpenCenter}
        onClose={() => setIsOpenCenter(false)}
        onConfirm={handleRemove}
      >
        <Typography as="span" variant="text15" weight="bold">
          운동 기록을 삭제하시겠습니까?
        </Typography>
      </CenterModal>
    </>
  )
}
