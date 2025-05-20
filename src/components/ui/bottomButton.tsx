'use client'

import { ReactNode } from 'react'
import styles from './bottomButton.module.css'
import clsx from 'clsx'
import Typography from './typography'
import Button from './button'

type BottomButtonVariant = 'primary' | 'secondary'

interface BottomButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?: BottomButtonVariant
}

const BottomButton = ({
  children,
  onClick,
  disabled = false,
  className,
  variant = 'primary',
}: BottomButtonProps) => {
  return (
    <div className={styles.wrapper}>
      <Button
        className={clsx(
          styles.button,
          styles[variant],
          { [styles.disabled]: disabled },
          className,
        )}
        onClick={onClick}
        disabled={disabled}
      >
        <Typography variant="text16" as="span" weight="bold">
          {children}
        </Typography>
      </Button>
    </div>
  )
}

export default BottomButton