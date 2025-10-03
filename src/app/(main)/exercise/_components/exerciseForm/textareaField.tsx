import clsx from 'clsx'

import Typography from '@/components/ui/typography'

import styles from './textareaField.module.css'

interface TextAreaFieldProps {
  className?: string
  value: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  label: string
  id: string
  placeholder?: string
  readonly?: boolean
}

const TextareaField = ({
  className,
  value,
  onChange,
  label,
  id,
  placeholder,
  readonly = false,
}: TextAreaFieldProps) => {
  return (
    <div className={clsx(className, styles['container'])}>
      <label htmlFor={id}>
        <Typography as="span" variant="content-large" weight="medium">
          {label}
        </Typography>
      </label>
      <textarea
        className={styles['textarea']}
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        readOnly={readonly}
      />
    </div>
  )
}

export default TextareaField
