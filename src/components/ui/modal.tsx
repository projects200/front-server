import XIcon from '@/assets/icon_x.svg'

import Portal from './portal'
import styles from './modal.module.css'

interface CenterModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ isOpen, onClose, children }: CenterModalProps) => {
  if (!isOpen) return null

  return (
    <Portal>
      <div className={styles['overlay']}>
        <div className={styles['modal']}>
          <div className={styles['content']}>{children}</div>
          <button className={styles['close-button']} onClick={onClose}>
            <XIcon className={styles['close-icon']} />
          </button>
        </div>
      </div>
    </Portal>
  )
}

export default Modal
