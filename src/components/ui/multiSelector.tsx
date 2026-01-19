'use client'

import { useState, useEffect } from 'react'
import CheckIcon from '@/assets/icon_option_check.svg'
import Typography from '@/components/ui/typography'
import Portal from './portal'
import styles from './selector.module.css'

const ALL_OPTION = '전체'

type Props = {
  isOpen: boolean
  onClose: (tempValues: string[]) => void
  options: string[]
  value: string[]
}

export default function MultiSelector({
  isOpen,
  onClose,
  options,
  value,
}: Props) {
  const [tempSelection, setTempSelection] = useState<string[]>([])

  useEffect(() => {
    if (isOpen) {
      setTempSelection(value.length === 0 ? [ALL_OPTION] : value)
    }
  }, [isOpen, value])

  const handleToggle = (option: string) => {
    setTempSelection((prev) => {
      if (option === ALL_OPTION) return [ALL_OPTION]
      if (prev.includes(ALL_OPTION)) return [option]
      const next = prev.includes(option)
        ? prev.filter((i) => i !== option)
        : [...prev, option]
      return next.length === 0 ? [ALL_OPTION] : next
    })
  }

  if (!isOpen) return null

  const displayOptions = [ALL_OPTION, ...options]

  return (
    <Portal>
      <div
        className={styles['overlay']}
        onClick={() => onClose(tempSelection)}
      />
      <div className={styles['bottom-sheet']}>
        <ul className={styles['option-list']}>
          {displayOptions.map((option) => (
            <li key={option}>
              <button
                className={styles['option-item']}
                onClick={() => handleToggle(option)}
              >
                <Typography
                  as="span"
                  variant="content-large"
                  weight={tempSelection.includes(option) ? 'bold' : 'medium'}
                >
                  {option}
                </Typography>
                {tempSelection.includes(option) && (
                  <CheckIcon className={styles['check-icon']} />
                )}
              </button>
            </li>
          ))}
        </ul>
        <div className={styles['bottom-sheet-footer']}>
          <button
            className={styles['close-button']}
            onClick={() => onClose(tempSelection)}
          >
            <Typography as="span" variant="content-large" weight="bold">
              닫기
            </Typography>
          </button>
        </div>
      </div>
    </Portal>
  )
}
