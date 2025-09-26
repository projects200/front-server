'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

import Typography from './typography'
import styles from './button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'warning'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <Typography variant="content-large" as="span" weight="bold">
        {children}
      </Typography>
    </button>
  )
}

export default Button
