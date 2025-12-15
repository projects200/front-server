import { forwardRef, InputHTMLAttributes } from 'react'

import styles from './toggleSwitch.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean
  onChange: () => void
}

const ToggleSwitch = forwardRef<HTMLInputElement, Props>(
  ({ checked, onChange, id, ...rest }, ref) => {
    return (
      <label htmlFor={id} className={styles['toggle-switch']}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={styles['checkbox']}
          {...rest}
        />
        <span className={styles['slider']} />
      </label>
    )
  },
)

ToggleSwitch.displayName = 'ToggleSwitch'
export default ToggleSwitch