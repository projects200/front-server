import Portal from './portal'
import styles from './modal.module.css'

interface CenterModalProps {
  children: React.ReactNode
}

const CenterDialog = ({ children }: CenterModalProps) => {
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
