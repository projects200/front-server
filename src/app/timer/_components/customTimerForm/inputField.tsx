import styles from './inputField.module.css'

interface InputFieldProps {
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  id: string
  maxLength?: number
  placeholder?: string
}

const InputField = ({
  value,
  onChange,
  id,
  maxLength,
  placeholder,
}: InputFieldProps) => {
  return (
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
    />
  )
}

export default InputField
