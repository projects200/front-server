'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import Typography from '@/components/ui/typography'
import Button from '@/components/ui/button'

import styles from './bottomButton.module.css'

type BottomButtonVariant = 'primary' | 'secondary'

interface BottomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  ...props
}: BottomButtonProps) => {
  return (
    <div className={styles['wrapper']}>
      <Button
        className={clsx(styles.button, styles[variant], className)}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        <Typography variant="text15" as="span" weight="bold">
          {children}
        </Typography>
      </Button>
    </div>
  )
}

export default BottomButton
