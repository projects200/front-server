'use client'

import CheckStatusIcon from '@/components/ui/checkStatusIcon'
import Typography from '@/components/ui/typography'

import styles from './agreementItem.module.css'

interface AgreementItemProps {
  label: string
  checked: boolean
  onToggle: () => void
  onClickLabel?: () => void
}

const AgreementItem = ({
  label,
  checked,
  onToggle,
  onClickLabel,
}: AgreementItemProps) => {
  return (
    <div className={styles['item']}>
      <button onClick={onClickLabel}>
        <Typography
          className={styles['label']}
          as="span"
          variant="content-medium"
        >
          {label} &gt;
        </Typography>
      </button>
      <button className={styles['icon-button']} onClick={onToggle}>
        <CheckStatusIcon checked={checked} />
      </button>
    </div>
  )
}

export default AgreementItem
