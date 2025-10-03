'use client'

import CheckStatusIcon from '@/components/ui/checkStatusIcon'
import Typography from '@/components/ui/typography'

import styles from './genderField.module.css'

type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN'

type Props = {
  value: Gender | null
  onChange: (value: Gender) => void
}

export default function GenderField({ value, onChange }: Props) {
  const genderOptions: { label: string; value: Gender }[] = [
    { label: '남', value: 'MALE' },
    { label: '여', value: 'FEMALE' },
    { label: '공개안함', value: 'UNKNOWN' },
  ]

  return (
    <div className={styles['container']}>
      <label className={styles['label']}>
        <Typography as="span" variant="content-large" weight="bold">
          성별
        </Typography>
      </label>
      <div className={styles['button-group']}>
        {genderOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={styles['option']}
            onClick={() => onChange(option.value)}
          >
            <Typography as="span" variant="content-large">
              {option.label}
            </Typography>
            <CheckStatusIcon
              checked={value === option.value}
              className={styles['icon']}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
