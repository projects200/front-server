'use client'

import { ReactNode } from 'react'
import styles from './button.module.css'
import clsx from 'clsx'
import Typography from './typography'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?: ButtonVariant
}

const Button = ({
  children,
  onClick,
  disabled = false,
  className,
  variant = 'primary',
}: ButtonProps) => {
  return (
      <button
        className={clsx(
          styles.button,
          styles[variant],
          className,
        )}
        onClick={onClick}
        disabled={disabled}
      >
        <Typography variant='text16' as='span' weight='bold'>{children}</Typography>
      </button>
  )
}

export default Button
