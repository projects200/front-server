'use client'

import clsx from 'clsx'
import { useState } from 'react'

import BottomArrow from '@/assets/icon_bottom_arrow.svg'
import Typography from '@/components/ui/typography'
import MultiSelector from './multiSelector'

import styles from './multiSelectFilter.module.css'

type Props = {
  label: string
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
}

export default function MultiSelectFilter({ label, options, value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles['container']}>
      <button
        className={clsx(styles['filter-button'], { [styles['active']]: value.length > 0 })}
        onClick={() => setIsOpen(true)}
      >
        <Typography as="span" variant="content-medium">{label}</Typography>
        <BottomArrow className={styles['bottom-arrow']} />
      </button>

      <MultiSelector 
        isOpen={isOpen} 
        onClose={(nextValues) => {
          onChange(nextValues)
          setIsOpen(false)
        }} 
        options={options} 
        value={value} 
      />
    </div>
  )
}