'use client'

import CheckStatusIcon from '@/components/ui/checkStatusIcon'
import styles from './genderSelector.module.css'
import Typography from '@/components/ui/typography'

type Gender = 'M' | 'F' | 'U'

interface GenderSelectorProps {
  value: Gender
  onChange: (value: Gender) => void
}

const GenderSelector = ({ value, onChange }: GenderSelectorProps) => {
  const genderOptions: { label: string; value: Gender }[] = [
    { label: '남', value: 'M' },
    { label: '여', value: 'F' },
    { label: '공개안함', value: 'U' },
  ]

  return (
    <div className={styles.container}>
      {genderOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          className={styles.option}
          onClick={() => onChange(option.value)}
        >
          <Typography as='span' variant='text16'>{option.label}</Typography>
          <CheckStatusIcon checked={value === option.value} className={styles.icon} />
        </button>
      ))}
    </div>
  )
}

export default GenderSelector