import { forwardRef } from 'react'

import ExitIcon from '@/assets/exit_icon.svg'
import Typography from '@/components/ui/typography'

import styles from './kebabModal.module.css'

type Props = {
  onExit: () => void
}

const KebabModal = forwardRef<HTMLDivElement, Props>(({ onExit }, ref) => {
  return (
    <div ref={ref} className={styles['kebab-menu']}>
      <button className={styles['kebab-menu-item']} onClick={onExit}>
        <ExitIcon className={styles['icon']} />
        <Typography as="span" variant="content-large">
          나가기
        </Typography>
      </button>
    </div>
  )
})

KebabModal.displayName = 'KebabModal'
export default KebabModal
