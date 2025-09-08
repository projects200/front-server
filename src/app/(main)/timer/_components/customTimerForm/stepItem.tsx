import ClockIcon from '@/assets/icon_clock.svg'
import MinusIcon from '@/assets/icon_minus.svg'
import KnobIcon from '@/assets/icon_knob.svg'
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
  ...props
}: Props & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={styles['step-item']} {...props}>
      <div className={styles['knob-section']} data-drag-handle="true"></div>
      <KnobIcon className={styles['knob-icon']} />
      <ClockIcon className={styles['clock-icon']} />
      <input
        type="text"
        value={step.name}
        onChange={(e) => onNameChange(e.target.value)}
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
