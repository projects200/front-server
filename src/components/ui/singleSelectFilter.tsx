'use client'

import clsx from 'clsx'
import { useState } from 'react'

import CheckIcon from '@/assets/icon_option_check.svg'
import BottomArrow from '@/assets/icon_bottom_arrow.svg'
import Typography from '@/components/ui/typography'

import Portal from './portal'
import styles from './singleSelectFilter.module.css'

type Props = {
  label: string
  options: string[]
  value: string | null
  onChange: (value: string | null) => void
}

export default function SingleSelectFilter({
  label,
  options,
  value,
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option: string) => {
    const newValue = value === option ? null : option
    onChange(newValue)
    setIsOpen(false)
  }

  return (
    <div className={styles['container']}>
      <button
        className={clsx(styles['filter-button'], { [styles['active']]: value })}
        onClick={() => setIsOpen(true)}
      >
        <Typography as="span" variant="content-medium">
          {value || label}
        </Typography>
        <BottomArrow className={styles['bottom-arrow']} />
      </button>

      {isOpen && (
        <Portal>
          <div className={styles['overlay']} onClick={() => setIsOpen(false)} />
          <div className={styles['bottom-sheet']}>
            <ul>
              {options.map((option) => (
                <li key={option}>
                  <button
                    className={styles['option-item']}
                    onClick={() => handleSelect(option)}
                  >
                    <Typography
                      as="span"
                      variant="content-large"
                      weight={value === option ? 'bold' : 'medium'}
                    >
                      {option}
                    </Typography>
                    {value === option && (
                      <CheckIcon className={styles['check-icon']} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles['bottom-sheet-footer']}>
              <button
                className={styles['close-button']}
                onClick={() => setIsOpen(false)}
              >
                <Typography as="span" variant="content-large" weight="bold">
                  닫기
                </Typography>
              </button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  )
}
