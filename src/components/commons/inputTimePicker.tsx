'use client'

import { useState, useEffect, useRef, ChangeEvent } from 'react'

import Button from '@/components/ui/button'

import Typography from '../ui/typography'
import styles from './inputTimePicker.module.css'

type Props = {
  initialTime?: number
  onClose: () => void
  onComplete: (newTotalSeconds: number) => void
}

export default function InputTimePicker({ initialTime = 0, onClose, onComplete }: Props) {
  const initialMin = Math.floor(initialTime / 60)
  const initialSec = initialTime % 60

  const [minutes, setMinutes] = useState<string>(String(initialMin).padStart(2, '0'))
  const [seconds, setSeconds] = useState<string>(String(initialSec).padStart(2, '0'))

  const minRef = useRef<HTMLInputElement>(null)

  // 모달 오픈 시 '분' 입력창에 자동 포커스
  useEffect(() => {
    minRef.current?.focus()
  }, [])

  // 입력값 검증 및 보정 로직
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const value = e.target.value.replace(/[^0-9]/g, '')

    if (value === '') {
      setter('')
      return
    }

    const numValue = parseInt(value, 10)
    if (numValue > 59) {
      setter('59')
    } else {
      setter(value.slice(-2))
    }
  }

  // 포커스 아웃 시 0 붙여주는 포맷팅
  const handleBlur = (val: string, setter: (val: string) => void) => {
    if (val === '') {
      setter('00')
    } else {
      setter(val.padStart(2, '0'))
    }
  }

  const handleConfirm = () => {
    const totalSeconds = parseInt(minutes || '0', 10) * 60 + parseInt(seconds || '0', 10)
    onComplete(totalSeconds)
    onClose()
  }

  return (
    <div className={styles['modal-overlay']} onClick={onClose}>
      <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
        <div className={styles['input-group-container']}>
          <div className={styles['input-unit']}>
            <Typography as="label" variant="content-medium">
              분
            </Typography>
            <input
              ref={minRef}
              type="text"
              inputMode="numeric"
              className={styles['time-input']}
              value={minutes}
              onChange={(e) => handleInputChange(e, setMinutes)}
              onBlur={() => handleBlur(minutes, setMinutes)}
            />
          </div>

          <div className={styles['separator']}>:</div>

          <div className={styles['input-unit']}>
            <Typography as="label" variant="content-medium">
              초
            </Typography>
            <input type="text" inputMode="numeric" className={styles['time-input']} value={seconds} onChange={(e) => handleInputChange(e, setSeconds)} onBlur={() => handleBlur(seconds, setSeconds)} />
          </div>
        </div>

        <div className={styles['footer-buttons']}>
          <Button type="button" variant="secondary" onClick={onClose} className={styles['cancel-button']}>
            취소
          </Button>
          <Button type="button" variant="primary" onClick={handleConfirm} className={styles['confirm-button']}>
            완료
          </Button>
        </div>
      </div>
    </div>
  )
}
