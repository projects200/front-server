import Typography from '@/components/ui/typography'

import styles from './inputField.module.css'

interface InputFieldProps {
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  id: string
  maxLength?: number
  placeholder?: string
  readonly?: boolean
}

const InputField = ({
  value,
  onChange,
  label,
  id,
  maxLength,
  placeholder,
  readonly=false
}: InputFieldProps) => {
  return (
    <div className={styles['container']}>
      <label htmlFor={id}>
        <Typography as="span" variant="text15" weight="medium">
          {label}
        </Typography>
      </label>
      <input
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
