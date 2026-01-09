'use client'

import clsx from 'clsx'
import { useState, useEffect } from 'react'

import CheckIcon from '@/assets/icon_option_check.svg'
import BottomArrow from '@/assets/icon_bottom_arrow.svg'
import Typography from '@/components/ui/typography'

import Portal from './portal'
import styles from './multiSelectFilter.module.css'

const ALL_OPTION = '전체'

type Props = {
  label: string
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
}

export default function MultiSelectFilter({
  label,
  options,
  value,
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempSelection, setTempSelection] = useState<string[]>(
    value.length === 0 ? [ALL_OPTION] : value,
  )

  useEffect(() => {
    setTempSelection(value.length === 0 ? [ALL_OPTION] : value)
  }, [value])

  const handleToggle = (option: string) => {
    setTempSelection((prev) => {
      // 전체를 클릭한 경우
      if (option === ALL_OPTION) {
        return [ALL_OPTION]
      }

      // 전체가 선택된 상태에서 다른 옵션을 클릭한 경우
      if (prev.includes(ALL_OPTION)) {
        return [option]
      }

      // 일반적인 토글 로직
      const newSelection = prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]

      // 만약 모든 옵션 선택을 해제했다면 전체 선택으로 처리
      if (newSelection.length === 0) {
        return [ALL_OPTION]
      }

      return newSelection
    })
  }

  const handleApply = () => {
    const valuesToApply = tempSelection.includes(ALL_OPTION)
      ? []
      : tempSelection

    onChange(valuesToApply)
    setIsOpen(false)
  }

  const displayOptions = [ALL_OPTION, ...options]

  return (
    <div className={styles['container']}>
      <button
        className={clsx(styles['filter-button'], {
          [styles['active']]: value.length > 0,
        })}
        onClick={() => setIsOpen(true)}
      >
        <Typography as="span" variant="content-medium">
          {label}
        </Typography>
        <BottomArrow className={styles['bottom-arrow']} />
      </button>

      {isOpen && (
        <Portal>
          <div className={styles['overlay']} onClick={handleApply} />
          <div className={styles['bottom-sheet']}>
            <ul>
              {displayOptions.map((option) => (
                <li key={option}>
                  <button
                    className={styles['option-item']}
                    onClick={() => handleToggle(option)}
                  >
                    <Typography
                      as="span"
                      variant="content-large"
                      weight={
                        tempSelection.includes(option) ? 'bold' : 'medium'
                      }
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
              <button className={styles['close-button']} onClick={handleApply}>
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
