import clsx from 'clsx'

import ClockIcon from '@/assets/icon_clock.svg'
import MinusIcon from '@/assets/icon_minus.svg'
import { formatNumberToTime } from '@/utils/timer'

import styles from './stepItem.module.css'

type Step = {
  name: string
  time: number
}

type Props = {
  step: Step
  onNameChange: (newName: string) => void
  onTimeClick: () => void
  onRemove: () => void
}

export default function StepItem({
  step,
  onNameChange,
  onTimeClick,
  onRemove,
}: Props) {
  return (
    <div className={styles['step-item']}>
      <ClockIcon className={clsx(styles['clock-icon'])} />
      <input
        type="text"
        value={step.name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Step"
        className={styles['step-name-input']}
        maxLength={50}
      />
      <button
        className={styles['step-time-input']}
        type="button"
        onClick={onTimeClick}
      >
        {formatNumberToTime(step.time)}
      </button>
      <button
        onClick={onRemove}
        type="button"
        className={styles['step-button']}
      >
        <MinusIcon className={styles['icon-minus']} />
      </button>
    </div>
  )
}
