import { forwardRef } from 'react'

import Typography from '@/components/ui/typography'

import styles from './kebabModal.module.css'

type Props = {
  onRepPicture: () => void
  onDownload: () => void
  onDelete: () => void
}

const KebabModal = forwardRef<HTMLDivElement, Props>(
  ({ onRepPicture, onDownload, onDelete }, ref) => {
    return (
      <div ref={ref} className={styles['kebab-menu']}>
        <button className={styles['kebab-menu-item']} onClick={onRepPicture}>
          <Typography as="span" variant="text15">
            프로필 사진으로 지정
          </Typography>
        </button>
        <button className={styles['kebab-menu-item']} onClick={onDownload}>
          <Typography as="span" variant="text15">
            저장하기
          </Typography>
        </button>
        <button className={styles['kebab-menu-item']} onClick={onDelete}>
          <Typography as="span" variant="text15" className={styles['remove']}>
            삭제
          </Typography>
        </button>
      </div>
    )
  },
)

KebabModal.displayName = 'KebabModal'
export default KebabModal
