'use client'

import { useState } from 'react'

import ScrollPicker from '@/components/commons/scrollPicker'

import styles from './datePicker.module.css'

type DatePickerProps = {
  value: string | null
  onChange: (value: string) => void
}

type Birthday = {
  year: number
  month: number
  day: number
}

const getInitialDate = (value: string | null): Birthday => {
  if (value) {
    const parsed = value.split('-').map(Number)
    return {
      year: parsed[0],
      month: parsed[1],
      day: parsed[2],
    }
  }
  return { year: 2000, month: 1, day: 1 }
}

const formatDisplay = (birthday: Birthday): string => {
  const { year, month, day } = birthday
  return `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`
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
        {value ? formatDisplay(formatValue) : 'YYYY/MM/DD'}
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
