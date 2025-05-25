'use client'

import { useState } from 'react'

import ScrollPicker from '@/components/commons/scrollPicker'

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
  return `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`
}

const formatStorage = (birthday: Birthday): string => {
  const { year, month, day } = birthday
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const [birthday, setBirthday] = useState(getInitialDate(value))
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (picked: Record<string, string | number>) => {
    setBirthday(picked as { year: number; month: number; day: number })
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
        {formatDisplay(birthday)}
      </button>

      {isOpen && (
        <ScrollPicker
          fields={['year', 'month', 'day']}
          value={birthday}
          onChange={handleChange}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
