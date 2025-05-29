import Portal from '../ui/portal'
import Button from '../ui/button'
import styles from './centerModal.module.css'

interface CenterModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  children: React.ReactNode
}

const CenterModal = ({
  isOpen,
  onClose,
  onConfirm,
  children,
}: CenterModalProps) => {
  if (!isOpen) return null

  return (
    <Portal>
      <div className={styles['overlay']}>
        <div className={styles['modal']}>
          <div className={styles['content']}>{children}</div>
          <div className={styles['actions']}>
            <Button variant="secondary" onClick={onClose}>
              닫기
            </Button>
            <Button variant="primary" onClick={onConfirm}>
              완료
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default CenterModal
