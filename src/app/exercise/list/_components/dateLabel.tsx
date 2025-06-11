'use client'

import DatePicker from './datePicker'
import styles from './dateLabel.module.css'

type DateLabelProps = {
  value: string
  onChange: (value: string) => void
}

export default function DateLabel({ value, onChange }: DateLabelProps) {
  return (
    <div className={styles['select']}>
      <DatePicker value={value} onChange={onChange} />
    </div>
  )
}
