'use client'

import { useState } from 'react'

import ScrollPicker from '@/components/commons/scrollPicker'
import Typography from '@/components/ui/typography'
import BottomArrowIcon from '@/assets/icon_bottom_arrow.svg'

import styles from './datePicker.module.css'

type DatePickerProps = {
  value: string
  onChange: (value: string) => void
}

type Birthday = {
  year: number
  month: number
  day: number
}

const getInitialDate = (value: string) => {
  const parsed = value.split('-').map(Number)
  return {
    year: parsed[0],
    month: parsed[1],
    day: parsed[2],
  }
}

const formatDisplay = (birthday: Birthday): string => {
  const { year, month, day } = birthday
  return `${year}년 ${String(month).padStart(2, '0')}월 ${String(day).padStart(2, '0')}일`
}

const formatStorage = (birthday: Birthday): string => {
  const { year, month, day } = birthday
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
    const formatValue = getInitialDate(value)

  const handleChange = (picked: Record<string, string | number>) => {
    onChange(
      formatStorage(picked as { year: number; month: number; day: number }),
    )
  }

  return (
    <div>
      <button
        className={styles['trigger-button']}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <Typography className={styles['text']} as="span" variant="text15" weight="bold">
          {formatDisplay(formatValue)}
        </Typography>
        <BottomArrowIcon className={styles['icon']}/>
      </button>

      {isOpen && (
        <ScrollPicker
          fields={['year', 'month', 'day']}
          value={formatValue}
          onChange={handleChange}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
