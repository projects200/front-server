import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ApiError } from '@/types/common'
import { useToast } from '@/hooks/useToast'
import { useExerciseApi } from '@/hooks/exercise/useExerciseApi'
import BottomModal from '@/components/commons/bottomModal'
import CenterModal from '@/components/commons/centerModal'
import EditIcon from '@/assets/icon_edit.svg'
import TrashIcon from '@/assets/icon_trash.svg'
import Typography from '@/components/ui/typography'
import SITE_MAP from '@/constants/siteMap.constant'

import styles from './kebabmodal.module.css'

type KebabModalProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  exerciseId: number
}

export default function KebabModal({
  isOpen,
  setIsOpen,
  exerciseId,
}: KebabModalProps) {
  const [isOpenCenter, setIsOpenCenter] = useState(false)

  const { deleteExercise } = useExerciseApi()
  const showToast = useToast()
  const router = useRouter()

  const handleEdit = () => {
    router.replace(`${SITE_MAP.EXERCISE_EDIT}?id=${exerciseId}`)
  }

  const handleRemove = async () => {
    try {
      await deleteExercise(exerciseId)
      showToast('운동기록이 삭제되었습니다.', 'info')
      router.replace(SITE_MAP.TEMP1) // 나중에 경로를 알맞게 바꿔줘야됨
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          showToast('인증이 만료되었습니다. 다시 로그인해주세요.', 'info')
          router.replace(SITE_MAP.LOGIN)
        } else {
          showToast(err.message, 'info')
          router.back()
        }
      } else if (err instanceof Error) {
        showToast(err.message, 'info')
        router.back()
      } else {
        showToast('서버 오류가 발생했습니다.', 'info')
        router.back()
      }
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
          <button className={styles['button']} onClick={handleEdit}>
            <EditIcon className={styles['modal-icon']} />
            <Typography as="span" variant="text15">
              수정하기
            </Typography>
          </button>
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
