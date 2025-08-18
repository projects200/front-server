'use client'

// import { mutate } from 'swr'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

import { useToast } from '@/hooks/useToast'
import BottomModal from '@/components/commons/bottomModal'
import CenterModal from '@/components/commons/centerModal'
import EditIcon from '@/assets/icon_edit.svg'
import TrashIcon from '@/assets/icon_trash.svg'
import Typography from '@/components/ui/typography'
import SITE_MAP from '@/constants/siteMap.constant'

import styles from './kebabmodal.module.css'

type Props = {
  isOpen: boolean
  onClose: () => void 
  customTimerId: number
}

export default function KebabModal({
  isOpen,
  onClose,
  customTimerId,
}: Props) {
  const [isOpenCenter, setIsOpenCenter] = useState(false)
  const showToast = useToast()
  const router = useRouter()

  // 백엔드 개발 완료시 커스텀 타이머 삭제 추가
  // const { trigger: deleteExercise } = useDeleteTimer(customTimerId)

  const handleRemove = async () => {
    try {
      // 커스텀 타이머 삭제 추가
      // await deleteExercise(null)
      console.log(customTimerId)
      showToast('타이머가 삭제되었습니다.', 'info')
      router.back()
    } catch {
      return
    }
  }

  return (
    <>
      <BottomModal
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className={styles['button-group']}>
          <Link
            className={styles['button']}
            // 수정하기 페이지로 이동(현재 임시로 리스트로 이동)
            href={`${SITE_MAP.TIMER_LIST}`}
          >
            <EditIcon className={styles['modal-icon']} />
            <Typography as="span" variant="text15">
              수정하기
            </Typography>
          </Link>
          <button
            className={styles['button']}
            onClick={() => {
              onClose()
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
          타이머를 삭제하시겠습니까?
        </Typography>
      </CenterModal>
    </>
  )
}
