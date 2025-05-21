import React from 'react'
import styles from './menuItem.module.css'
import Typography from '@/components/ui/typography'

interface MenuItemProps {
  icon: React.ReactNode
  label: string
  rightText?: string
  onClick?: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  rightText,
  onClick,
}) => {
  return (
    <button className={styles['menu-item']} onClick={onClick}>
      <div className={styles['left']}>
        {icon}
        <Typography as="span" variant="text16">
          {label}
        </Typography>
      </div>
      {rightText && <Typography className={styles['right-text']} as='span' variant='text12'>{rightText}</Typography>}
    </button>
  )
}

export default MenuItem
