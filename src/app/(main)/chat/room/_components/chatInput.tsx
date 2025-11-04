import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react'

import SendIcon from '@/assets/send_icon.svg'

import styles from './chatInput.module.css'

type Props = {
  onSend: (message: string) => void
  disabled: boolean
  blocked: boolean
}

export default function ChatInput({ onSend, disabled, blocked }: Props) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      const scrollHeight = textarea.scrollHeight
      const maxHeight = 150
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`
    }
  }

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend(value)
      setValue('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
        textareaRef.current.focus()
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={styles['input-container']}>
      <div className={styles['textarea-wrapper']}>
        <textarea
          ref={textareaRef}
          value={value}
          maxLength={400}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={styles['textarea']}
          placeholder={
            blocked
              ? '차단한 회원과는 대화할 수 없습니다'
              : disabled
                ? '상대방이 채팅방을 나갔습니다'
                : '메시지 입력'
          }
          disabled={disabled || blocked}
          rows={1}
        />
      </div>
      <button
        onClick={handleSend}
        className={styles['send-button']}
        disabled={!value.trim() || disabled || blocked}
      >
        <SendIcon className={styles['send-icon']} />
      </button>
    </div>
  )
}
