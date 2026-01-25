'use client'

import CheckIcon from '@/assets/icon_option_check.svg'
import Typography from '@/components/ui/typography'
import Portal from './portal'
import styles from './selector.module.css'

type Props = {
  isOpen: boolean
  onClose: () => void
  options: string[]
  value: string | null
  onSelect: (value: string | null) => void
}

export default function SingleSelector({ isOpen, onClose, options, value, onSelect }: Props) {
  if (!isOpen) return null

  return (
    <Portal>
      <div className={styles['overlay']} onClick={onClose} />
      <div className={styles['bottom-sheet']}>
        <ul className={styles['option-list']}>
          {options.map((option) => (
            <li key={option}>
              <button
                className={styles['option-item']}
                onClick={() => {
                  const nextValue = value === option ? null : option
                  onSelect(nextValue)
                  onClose()
                }}
              >
                <Typography as="span" variant="content-large" weight={value === option ? 'bold' : 'medium'}>
                  {option}
                </Typography>
                {value === option && <CheckIcon className={styles['check-icon']} />}
              </button>
            </li>
          ))}
        </ul>
        <div className={styles['bottom-sheet-footer']}>
          <button className={styles['close-button']} onClick={onClose}>
            <Typography as="span" variant="content-large" weight="bold">
              닫기
            </Typography>
          </button>
        </div>
      </div>
    </Portal>
  )
}
