import clsx from 'clsx'

import Typography from '@/components/ui/typography'
import { formatFullDateToKR } from '@/utils/dataFormatting'

import styles from './floatingDate.module.css'


type Props = {
  date: string | null
  isVisible: boolean
}

export default function FloatingDate({ date, isVisible }: Props) {
  if (!date) return null

  return (
    <div className={clsx(styles['container'], isVisible && styles['visible'])}>
      <Typography variant="content-medium">
        {formatFullDateToKR(date)}
      </Typography>
    </div>
  )
}
