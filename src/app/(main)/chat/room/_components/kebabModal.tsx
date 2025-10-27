import { forwardRef } from 'react'
import clsx from 'clsx'

import BlockIcon from '@/assets/icon_block.svg'
import ExitIcon from '@/assets/icon_exit.svg'
import Typography from '@/components/ui/typography'

import styles from './kebabModal.module.css'

type Props = {
  onExit: () => void
  onBlock: () => void
}

const KebabModal = forwardRef<HTMLDivElement, Props>(
  ({ onExit, onBlock }, ref) => {
    return (
      <div ref={ref} className={styles['kebab-menu']}>
        <button className={styles['kebab-menu-item']} onClick={onExit}>
          <ExitIcon className={styles['icon']} />
          <Typography as="span" variant="content-large">
            나가기
          </Typography>
        </button>
        <button
          className={clsx(styles['kebab-menu-item'], styles['red'])}
          onClick={onBlock}
        >
          <BlockIcon className={styles['icon']} />
          <Typography as="span" variant="content-large">
            차단
          </Typography>
        </button>
      </div>
    )
  },
)

KebabModal.displayName = 'KebabModal'
export default KebabModal
