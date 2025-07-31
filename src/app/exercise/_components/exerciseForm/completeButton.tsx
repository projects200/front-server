import Typography from '@/components/ui/typography'
import styles from './completeButton.module.css'

const CompleteButton = (
  <div className={styles['complete-button']}>
    <Typography
      as="span"
      variant="text15"
      weight="bold"
      className={styles['complete-button-text']}
    >
      완료
    </Typography>
  </div>
)

export default CompleteButton
