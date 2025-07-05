import clsx from 'clsx'

import Typography from '@/components/ui/typography'

import styles from './inputField.module.css'

interface InputFieldProps {
  className?: string
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  id: string
  maxLength?: number
  placeholder?: string
  readonly?: boolean
}

const InputField = ({
  className,
  value,
  onChange,
  label,
  id,
  maxLength,
  placeholder,
  readonly = false,
}: InputFieldProps) => {
  return (
    <div className={clsx(className, styles['container'])}>
      <label htmlFor={id}>
        <Typography as="span" variant="text15" weight="medium">
          {label}
        </Typography>
      </label>
      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
          }
        }}
        className={styles['input']}
        value={value}
        onChange={onChange}
        id={id}
        maxLength={maxLength}
        placeholder={placeholder}
        readOnly={readonly}
      />
    </div>
  )
}

export default InputField
