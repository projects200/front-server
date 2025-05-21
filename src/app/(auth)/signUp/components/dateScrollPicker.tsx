'use client'

import { useState, useEffect } from 'react'
import Picker from 'react-mobile-picker'
import styles from './dateScrollPicker.module.css'
import Button from '@/components/ui/button'

type Props = {
  value: string
  onChange: (val: string) => void
}

const getInitialDate = (value: string) => {
  if (!value) {
    const today = new Date()
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
  const today = new Date()
  const currentYear = today.getFullYear()

  useEffect(() => {
    const dateString = `${selected.year}-${String(selected.month).padStart(2, '0')}-${String(selected.day).padStart(2, '0')}`
    onChange(dateString)
  }, [selected, onChange])

  const selections = {
    year: Array.from({ length: 100 }, (_, i) => currentYear - i),
    month: Array.from({ length: 12 }, (_, i) => i + 1),
    day: Array.from({ length: 31 }, (_, i) => i + 1),
  }

  const formatted = `${selected.year}/${String(selected.month).padStart(2, '0')}/${String(selected.day).padStart(2, '0')}`

  return (
    <div>
      <button className={styles.triggerBtn} onClick={() => setIsOpen(true)}>
        {formatted}
      </button>

      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.pickerContainer}>
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
                                selected ? styles.selected : styles.unselected
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
            <div className={styles.footer}>
              <Button
                className={styles.button}
                variant="secondary"
                onClick={() => setIsOpen(false)}
              >
                닫기
              </Button>
              <Button
                className={styles.button}
                variant="primary"
                onClick={() => setIsOpen(false)}
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
