'use client'

import { useState } from 'react'

import ClockIcon from '@/assets/icon_clock.svg'
import PlusIcon from '@/assets/icon_plus.svg'
import { formatNumberToTime } from '@/utils/timer'

import styles from './stepCreator.module.css'

type Props = {
  newStepTime: number
  onAdd: (name: string, time: number) => void
  onTimeClick: () => void
}

export default function StepCreator({
  onAdd,
  onTimeClick,
  newStepTime,
}: Props) {
  const [newStepName, setNewStepName] = useState('')

  const handleAddClick = () => {
    onAdd(newStepName, newStepTime)
    setNewStepName('')
  }

  return (
    <div className={styles['step-item']}>
      <ClockIcon
        className={styles['clock-icon']}
      />
      <input
        type="text"
        value={newStepName}
        onChange={(e) => setNewStepName(e.target.value)}
        placeholder="Step"
        className={styles['step-name-input']}
        maxLength={50}
      />
      <button
        className={styles['step-time-input']}
        type="button"
        onClick={onTimeClick}
      >
        {formatNumberToTime(newStepTime)}
      </button>
      <button
        onClick={handleAddClick}
        type="button"
        className={styles['step-button']}
      >
        <PlusIcon className={styles['icon-plus']} />
      </button>
    </div>
  )
}
