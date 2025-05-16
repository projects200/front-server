import { ReactNode } from 'react'
import styles from './typography.module.css'
import clsx from 'clsx'

type TypographyVariant =
  | 'text32'
  | 'text24'
  | 'text18'
  | 'text16'
  | 'text14'
  | 'text12'
  | 'text8'

interface TypographyProps {
  variant: TypographyVariant
  children: ReactNode
  className?: string
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className,
}) => {
  return <span className={clsx(styles[variant], className)}>{children}</span>
}

export default Typography
