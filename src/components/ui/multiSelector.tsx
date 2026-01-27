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

export default function MultiSelector({ isOpen, onClose, options, value }: Props) {
  const [tempSelection, setTempSelection] = useState<string[]>([])

  useEffect(() => {
    if (isOpen) {
      setTempSelection(value.length === 0 ? [ALL_OPTION] : value)
    }
  }, [isOpen, value])

  const handleToggle = (option: string) => {
    setTempSelection((prev) => {
      if (option === ALL_OPTION) return [ALL_OPTION]
      
      const isAllSelected = prev.includes(ALL_OPTION)
      let next = isAllSelected ? [] : [...prev]

      if (next.includes(option)) {
        next = next.filter((i) => i !== option)
      } else {
        // 없으면 추가
        next = [...next, option]
      }

      return next.length === 0 ? [ALL_OPTION] : next
    })
  }

  const handleClose = () => {
    const finalSelection = tempSelection.filter((item) => item !== ALL_OPTION)
    onClose(finalSelection)
  }

  if (!isOpen) return null

  const displayOptions = [ALL_OPTION, ...options]

  return (
    <Portal>
      <div className={styles['overlay']} onClick={handleClose} />
      <div className={styles['bottom-sheet']}>
        <ul className={styles['option-list']}>
          {displayOptions.map((option) => (
            <li key={option}>
              <button className={styles['option-item']} onClick={() => handleToggle(option)}>
                <Typography as="span" variant="content-large" weight={tempSelection.includes(option) ? 'bold' : 'medium'}>
                  {option}
                </Typography>
                {tempSelection.includes(option) && <CheckIcon className={styles['check-icon']} />}
              </button>
            </li>
          ))}
        </ul>
        <div className={styles['bottom-sheet-footer']}>
          <button className={styles['close-button']} onClick={handleClose}>
            <Typography as="span" variant="content-large" weight="bold">
              닫기
            </Typography>
          </button>
        </div>
      </div>
    </Portal>
  )
}
