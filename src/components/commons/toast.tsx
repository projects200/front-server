import Typography from '../ui/typography'
import styles from './toast.module.css'
import { useToastContext } from '@/context/toastContext'
import clsx from 'clsx'

export const Toast = () => {
  const { toasts } = useToastContext()

  return (
    <div className={styles['toast-container']}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(styles['toast'], styles[toast.type ?? 'info'], toast.isVisible === false ? styles['fade-out'] : styles['fade-in'])}
        >
          <Typography className={styles['text']} as="span" variant="text12">
            {toast.message}
          </Typography>
        </div>
      ))}
    </div>
  )
}
