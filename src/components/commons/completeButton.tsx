import { ReactNode } from 'react'

import Typography from '@/components/ui/typography'

import styles from './completeButton.module.css'

type Props = {
  children: ReactNode
}

const CompleteButton = ({ children }: Props) => {
  return (
    <div className={styles['complete-button']}>
      <Typography
        as="span"
        variant="text15"
        weight="bold"
        className={styles['complete-button-text']}
      >
        {children}
      </Typography>
    </div>
  )
}

export default CompleteButton
