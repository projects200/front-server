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
import { useDeleteCustomTimer } from '@/hooks/api/useTimerApi'

import styles from './kebabmodal.module.css'

type Props = {
  isOpen: boolean
  onClose: () => void
  customTimerId: number
}

export default function KebabModal({ isOpen, onClose, customTimerId }: Props) {
  const { trigger: deleteCustomTimer } = useDeleteCustomTimer()
  const [isOpenCenter, setIsOpenCenter] = useState(false)
  const showToast = useToast()
  const router = useRouter()

  const handleRemove = async () => {
    try {
      await deleteCustomTimer({ customTimerId })
      showToast('타이머가 삭제되었습니다.', 'info')
      router.back()
    } catch {
      return
    }
  }

  return (
    <>
      <BottomModal isOpen={isOpen} onClose={onClose}>
        <div className={styles['button-group']}>
          <Link
            className={styles['button']}
            href={`${SITE_MAP.TIMER_EDIT}?id=${customTimerId}`}
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
