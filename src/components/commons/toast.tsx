import Typography from '../ui/typography'
import styles from './toast.module.css'
import { useToastContext } from '@/context/toastContext'

export const Toast = () => {
  const { toasts } = useToastContext()

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type ?? 'info']} ${toast.isVisible === false ? styles.fadeOut : styles.fadeIn}`}
        >
          <Typography className={styles.text} as="span" variant="text12">
            {toast.message}
          </Typography>
        </div>
      ))}
    </div>
  )
}
