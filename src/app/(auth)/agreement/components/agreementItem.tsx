'use client'

import styles from './AgreementItem.module.css'
import CheckStatusIcon from '@/components/ui/checkStatusIcon'
import Typography from '@/components/ui/typography'

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
    <div className={styles.item}>
      <div onClick={onClickLabel}>
        <Typography className={styles.label} as="span" variant="text14">
          {label} &gt;
        </Typography>
      </div>
      <button className={styles.iconButton} onClick={onToggle}>
        <CheckStatusIcon checked={checked} />
      </button>
    </div>
  )
}

export default AgreementItem
