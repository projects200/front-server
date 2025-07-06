'use client'

import DatePicker from './datePicker'
import styles from './dateLabel.module.css'

type Props = {
  value: string
  onChange: (value: string) => void
}

export default function DateLabel({ value, onChange }: Props) {

  return (
    <div className={styles['select']}>
      <DatePicker value={value} onChange={onChange} />
    </div>
  )
}
