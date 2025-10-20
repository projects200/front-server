import Typography from '@/components/ui/typography'

import styles from './message.module.css'

type Props = {
  content: string
}

export default function SystemMessage({ content }: Props) {
  return (
    <div className={styles['system-message-container']}>
      <Typography
        as="p"
        variant="content-medium"
        className={styles['system-message']}
      >
        {content}
      </Typography>
    </div>
  )
}
