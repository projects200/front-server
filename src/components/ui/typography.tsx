import { ReactNode, ElementType } from 'react'
import clsx from 'clsx'

import styles from './typography.module.css'

type TextElement = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'label'

type TypographyWeight = 'regular' | 'medium' | 'semi-bold' | 'bold'

type TypographyVariant = 'header' | 'title-large' | 'title-medium' | 'title-small' | 'content-large' | 'content-medium' | 'content-small' | 'content-tiny'

type TypographyProps<T extends TextElement = 'span'> = {
  as?: T
  children: ReactNode
  className?: string
  variant: TypographyVariant
  weight?: TypographyWeight
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children'>

const Typography = <T extends TextElement = 'span'>({ as, variant, children, className, weight = 'regular', ...props }: TypographyProps<T>) => {
  const Component = (as || 'span' )as ElementType
  return (
    <Component className={clsx(className, styles[weight], styles[variant], styles['text'])} {...props}>
      {children}
    </Component>
  )
}

export default Typography
