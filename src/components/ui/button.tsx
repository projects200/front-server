import { ReactNode } from 'react'
import styles from './button.module.css'
import clsx from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps {
  variant: ButtonVariant
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  disabled = false,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        styles.button,
        styles[variant],
        { [styles.disabled]: disabled },
        className,
      )}
    >
      {children}
    </button>
  )
}

export default Button
