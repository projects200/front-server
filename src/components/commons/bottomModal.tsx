import Portal from '../ui/portal'
import Typography from '../ui/typography'
import styles from './bottomModal.module.css'

interface BottomModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const BottomModal = ({ isOpen, onClose, children }: BottomModalProps) => {
  if (!isOpen) return null

  return (
    <Portal>
      <div className={styles['overlay']}>
        <div className={styles['modal']}>
          <div className={styles['content']}>{children}</div>
          <button className={styles['close']} onClick={onClose}>
            <Typography as="span" variant="content-large" weight="bold">
              닫 기
            </Typography>
          </button>
        </div>
      </div>
    </Portal>
  )
}

export default BottomModal
