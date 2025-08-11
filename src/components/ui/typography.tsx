import { ReactNode } from 'react'
import clsx from 'clsx'

import styles from './typography.module.css'

type TextElement = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3'

type TypographyWeight = 'regular' | 'medium' | 'bold'

type TypographyVariant =
  | 'text32'
  | 'text24'
  | 'text22'
  | 'text18'
  | 'text15'
  | 'text14'
  | 'text12'
  | 'text8'

type TypographyProps<T extends TextElement = 'span'> = {
  as?: T
  children: ReactNode
  className?: string
  variant: TypographyVariant
  weight?: TypographyWeight
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children'>

const Typography = <T extends TextElement = 'span'>({
  as,
  variant,
  children,
  className,
  weight = 'regular',
  ...props
}: TypographyProps<T>) => {
  const Component = as || 'span'
  return (
    <Component
      className={clsx(
        className,
        styles[weight],
        styles[variant],
        styles['text'],
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Typography
