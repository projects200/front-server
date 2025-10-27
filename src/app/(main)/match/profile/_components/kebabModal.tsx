import { forwardRef } from 'react'

import BlockIcon from '@/assets/icon_block.svg'
import Typography from '@/components/ui/typography'

import styles from './kebabModal.module.css'

type Props = {
  onBlock: () => void
}

const KebabModal = forwardRef<HTMLDivElement, Props>(({ onBlock }, ref) => {
  return (
    <div ref={ref} className={styles['kebab-menu']}>
      <button className={styles['kebab-menu-item']} onClick={onBlock}>
        <BlockIcon className={styles['icon']} />
        <Typography as="span" variant="content-large">
          차단
        </Typography>
      </button>
    </div>
  )
})

KebabModal.displayName = 'KebabModal'
export default KebabModal
