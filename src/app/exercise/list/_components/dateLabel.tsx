'use client'

import DatePicker from './datePicker'
import styles from './dateLabel.module.css'


type DateLabelProps = {
  value: string | null
  onChange: (value: string) => void
}

export default function DateLabel({ value, onChange }: DateLabelProps) {
  if (!value) return null

  return (
    <div className={styles['select']}>
      <DatePicker value={value} onChange={onChange} />
    </div>
  )
}
