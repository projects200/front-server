'use client'

import { useState } from 'react'
import clsx from 'clsx'

import { useReadCheckNickname } from '@/hooks/api/useAuthApi'
import { useToast } from '@/hooks/useToast'
import Typography from '@/components/ui/typography'

import styles from './nicknameField.module.css'

type Props = {
  value: string
  onChange: (value: string, isChecked: boolean) => void
  initialNickname: string
}

type Feedback = {
  type: 'success' | 'error'
  message: string
}

export default function NicknameField({
  value,
  onChange,
  initialNickname,
}: Props) {
  const showToast = useToast()
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [isCheckSuccessful, setIsCheckSuccessful] = useState(true)
  const { trigger, isMutating } = useReadCheckNickname()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(null)
    setIsCheckSuccessful(false)
    onChange(e.target.value, false)
  }

  const handleCheckClick = async () => {
    const nickname = value.trim()
    setFeedback(null)
    setIsCheckSuccessful(false)

    if (nickname === initialNickname) {
      showToast('기존 닉네임과 같습니다', 'info')
      setIsCheckSuccessful(true)
      onChange(nickname, true)
      return
    }

    if (
      !nickname ||
      nickname.length > 30 ||
      !/^[a-zA-Z0-9가-힣]+$/.test(nickname)
    ) {
      setFeedback({ type: 'error', message: '닉네임 조건을 확인해주세요.' })
      onChange(nickname, false)
      return
    }

    try {
      const result = await trigger({ nickname })

      if (result.data.available) {
        setFeedback({ type: 'success', message: '사용 가능한 닉네임입니다.' })
        setIsCheckSuccessful(true)
        onChange(nickname, true)
      } else {
        setFeedback({ type: 'error', message: '중복된 닉네임입니다.' })
        onChange(nickname, false)
      }
    } catch {}
  }

  return (
    <div className={styles['container']}>
      <label htmlFor="nickname" className={styles['label']}>
        <Typography as="span" variant="text15" weight="bold">
          닉네임
        </Typography>
      </label>
      <div className={styles['input-section']}>
        <div className={styles['input-and-button']}>
          <input
            id="nickname"
            type="text"
            value={value}
            onChange={handleInputChange}
            className={styles['input']}
            maxLength={30}
          />
          <button
            type="button"
            onClick={handleCheckClick}
            disabled={isMutating || isCheckSuccessful}
            className={styles['check-button']}
          >
            <Typography as="span" variant="text14">
              중복 확인
            </Typography>
          </button>
        </div>
        {feedback && (
          <p className={clsx(styles['feedback-text'], styles[feedback.type])}>
            {feedback.message}
          </p>
        )}
        <ul className={styles['rules-list']}>
          <li>
            <Typography as="span" variant="text14">
              영어, 한글, 숫자 포함 30자 이내
            </Typography>
          </li>
          <li>
            <Typography as="span" variant="text14">
              태그, 이모지 및 특수 문자 불가능
            </Typography>
          </li>
        </ul>
      </div>
    </div>
  )
}
