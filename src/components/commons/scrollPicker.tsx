'use client'

import { useState } from 'react'
import Picker from 'react-mobile-picker'

import Button from '@/components/ui/button'

import styles from './scrollPicker.module.css'

type FieldKey = 'date' | 'year' | 'month' | 'day' | 'hour' | 'minute'

type ScrollPickerProps = {
  fields: FieldKey[]
  value: Record<string, string | number>
  onChange: (value: Record<string, string | number>) => void
  onClose: () => void
}

const generateOptions = () => {
  const today = new Date()
  const currentYear = today.getFullYear()
  const startYear = 1945

  return {
    year: Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => startYear + i,
    ),
    month: Array.from({ length: 12 }, (_, i) => i + 1),
    day: Array.from({ length: 31 }, (_, i) => i + 1),
    hour: Array.from({ length: 24 }, (_, i) => i),
    minute: Array.from({ length: 13 }, (_, i) => i * 5),
    date: (() => {
      const result: string[] = []
      for (let i = 0; i < 365; i++) {
        const d = new Date()
        d.setDate(today.getDate() - i)
        const yy = String(d.getFullYear()).slice(2)
        const mm = String(d.getMonth() + 1).padStart(2, '0')
        const dd = String(d.getDate()).padStart(2, '0')
        result.unshift(`${yy}.${mm}.${dd}`)
      }
      return result
    })(),
  }
}

const OPTIONS = generateOptions()

export default function ScrollPicker({
  fields,
  value,
  onChange,
  onClose,
}: ScrollPickerProps) {
  const [selected, setSelected] =
    useState<Record<string, string | number>>(value)

  const handleButton = () => {
    onChange(selected)
    onClose()
  }

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal']}>
        <div className={styles['picker-container']}>
          <Picker value={selected} onChange={setSelected} wheelMode="normal">
            {fields.map((field) => (
              <Picker.Column key={field} name={field}>
                {OPTIONS[field].map((option) => (
                  <Picker.Item key={option} value={option}>
                    {({ selected }) => (
                      <div
                        className={
                          selected ? styles.selected : styles.unselected
                        }
                      >
                        {typeof option === 'number'
                          ? String(option).padStart(2, '0')
                          : option}
                      </div>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
            ))}
          </Picker>
        </div>

        <div className={styles.footer}>
          <Button type="button" variant="secondary" onClick={() => onClose()}>
            취소
          </Button>
          <Button type="button" variant="primary" onClick={handleButton}>
            완료
          </Button>
        </div>
      </div>
    </div>
  )
}
