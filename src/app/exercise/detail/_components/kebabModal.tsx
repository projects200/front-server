import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
}

export default function KebabModal({ isOpen, setIsOpen }: KebabModalProps) {
  const [isOpenCenter, setIsOpenCenter] = useState(false)
  const router = useRouter()
  return (
    <>
      <BottomModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
      >
        <div className={styles['button-group']}>
          <button
            className={styles['button']}
            onClick={() => {
              // 데이터 함께 전달해줘야함
              alert('데이터 전달해줘야합니다.')
              router.push(SITE_MAP.EXERCISE_EDIT)
            }}
          >
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
        onConfirm={() => {
          // 삭제 api 호출
          alert('삭제api연결해야됩니다')
        }}
      >
        <Typography as="span" variant="text15" weight="bold">
          운동 기록을 삭제하시겠습니까?
        </Typography>
      </CenterModal>
    </>
  )
}
