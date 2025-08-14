import BackIcon from '@/assets/icon_left_arrow.svg'

import Portal from '../ui/portal'
import styles from './legalDocModal.module.css'

type Props = {
  src: string
  onClose: () => void
}

const LegalDocModal = ({ src, onClose }: Props) => {
  return (
    <Portal>
      <div className={styles['overlay']}>
        <div className={styles['modal']}>
          <button className={styles['back-button']} onClick={onClose}>
            <BackIcon className={styles['back-icon']} />
          </button>
          <div className={styles['iframe-container']}>
            <iframe
              src={src}
              title="Legal Document"
              className={styles['iframe']}
            />
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default LegalDocModal
