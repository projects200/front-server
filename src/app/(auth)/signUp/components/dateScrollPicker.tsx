'use client'

import { useState } from 'react'
import Picker from 'react-mobile-picker'
import styles from './dateScrollPicker.module.css'
import Button from '@/components/ui/button'

type Props = {
  value: string
  onChange: (val: string) => void
}

const today = new Date()
const currentYear = today.getFullYear()
const selections = {
  year: Array.from({ length: 100 }, (_, i) => currentYear - i),
  month: Array.from({ length: 12 }, (_, i) => i + 1),
  day: Array.from({ length: 31 }, (_, i) => i + 1),
}

const getInitialDate = (value: string) => {
  if (!value) {
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    }
  }

  const parsed = value.split('-').map(Number)
  return {
    year: parsed[0],
    month: parsed[1],
    day: parsed[2],
  }
}
const DateScrollPicker = ({ value, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(getInitialDate(value))

  const formatted = `${selected.year}/${String(selected.month).padStart(2, '0')}/${String(selected.day).padStart(2, '0')}`

  const handleButton = () => {
    const dateString = `${selected.year}-${String(selected.month).padStart(2, '0')}-${String(selected.day).padStart(2, '0')}`
    onChange(dateString)
    setIsOpen(false)
  }

  return (
    <div>
      <button
        className={styles['trigger-button']}
        onClick={() => setIsOpen(true)}
      >
        {formatted}
      </button>

      {isOpen && (
        <div className={styles['modal-overlay']}>
          <div className={styles['modal']}>
            <div className={styles['picker-container']}>
              <Picker
                value={selected}
                onChange={setSelected}
                wheelMode="normal"
                className="custom-picker"
              >
                {(Object.keys(selections) as (keyof typeof selected)[]).map(
                  (key) => (
                    <Picker.Column key={key} name={key}>
                      {selections[key].map((option) => (
                        <Picker.Item key={option} value={option}>
                          {({ selected }) => (
                            <div
                              className={
                                selected
                                  ? styles['selected']
                                  : styles['unselected']
                              }
                            >
                              {option}
                            </div>
                          )}
                        </Picker.Item>
                      ))}
                    </Picker.Column>
                  ),
                )}
              </Picker>
            </div>
            <div className={styles['footer']}>
              <Button
                className={styles['button']}
                variant="secondary"
                onClick={handleButton}
              >
                닫기
              </Button>
              <Button
                className={styles['button']}
                variant="primary"
                onClick={handleButton}
              >
                완료
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DateScrollPicker
