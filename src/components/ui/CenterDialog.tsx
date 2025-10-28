import Portal from './portal'
import styles from './modal.module.css'

interface CenterModalProps {
  isOpen: boolean
  children: React.ReactNode
}

const CenterDialog = ({ isOpen, children }: CenterModalProps) => {
  if (!isOpen) return null

  return (
    <Portal>
      <div className={styles['overlay']}>
        <div className={styles['modal']}>
          <div className={styles['content']}>{children}</div>
        </div>
      </div>
    </Portal>
  )
}

export default CenterDialog
