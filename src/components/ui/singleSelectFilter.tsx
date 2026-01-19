'use client'

import clsx from 'clsx'
import { useState } from 'react'

import BottomArrow from '@/assets/icon_bottom_arrow.svg'
import Typography from '@/components/ui/typography'
import SingleSelector from './singleSelector'

import styles from './singleSelectFilter.module.css'

type Props = {
  label: string
  options: string[]
  value: string | null
  onChange: (value: string | null) => void
}

export default function SingleSelectFilter({
  label,
  options,
  value,
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles['container']}>
      <button
        className={clsx(styles['filter-button'], { [styles['active']]: value })}
        onClick={() => setIsOpen(true)}
      >
        <Typography as="span" variant="content-medium">
          {value || label}
        </Typography>
        <BottomArrow className={styles['bottom-arrow']} />
      </button>

      <SingleSelector
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        options={options}
        value={value}
        onSelect={onChange}
      />
    </div>
  )
}
