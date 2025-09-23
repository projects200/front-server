import { forwardRef } from 'react'

import EditIcon from '@/assets/icon_edit.svg'
import TrashIcon from '@/assets/icon_trash.svg'
import Typography from '@/components/ui/typography'

import styles from './kebabModal.module.css'

type Props = {
  onEdit: () => void
  onDelete: () => void
}

const KebabModal = forwardRef<HTMLDivElement, Props>(
  ({ onEdit, onDelete }, ref) => {
    return (
      <div ref={ref} className={styles['kebab-menu']}>
        <button className={styles['kebab-menu-item']} onClick={onEdit}>
          <EditIcon className={styles['icon']} />
          <Typography as="span" variant="text15">
            수정
          </Typography>
        </button>
        <button className={styles['kebab-menu-item']} onClick={onDelete}>
          <TrashIcon className={styles['icon']} />
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
