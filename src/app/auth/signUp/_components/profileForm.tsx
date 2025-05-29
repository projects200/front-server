'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useRegistrationStore } from '@/store/useRegistrationStore'
import BottomButton from '@/components/commons/bottomButton'
import Typography from '@/components/ui/typography'
import { useToast } from '@/hooks/useToast'
import { validateNickname, validateBirthdate } from '@/utils/validation'
import { useAuthApi } from '@/api/auth'
import SITE_MAP from '@/constants/siteMap.constant'

import DatePicker from './datePicker'
import GenderSelector from './genderSelector'
import styles from './profileForm.module.css'

export default function ProfileForm() {
  const [nickname, setNickname] = useState('')
  const [birthdate, setBirthdate] = useState('2000-01-01')
  const [gender, setGender] = useState<'M' | 'F' | 'U'>('U')
  const router = useRouter()
  const showToast = useToast()
  const { signUp } = useAuthApi()

  const isValid = nickname.trim() !== '' && birthdate.trim() !== ''

  async function handleSubmit() {
    const nicknameCheck = validateNickname(nickname.trim())
    if (!nicknameCheck.valid) {
      showToast(nicknameCheck.error!, 'info')
      return
    }

    const birthdateCheck = validateBirthdate(birthdate.trim())
    if (!birthdateCheck.valid) {
      showToast(birthdateCheck.error!, 'info')
      return
    }

    try {
      await signUp({ nickname, birthdate, gender })
      useRegistrationStore.getState().setRegistered(true)
      router.push(SITE_MAP.TEMP1)
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : '서버 오류가 발생했습니다.'
      showToast(message, 'info')
    }
  }

  return (
    <div className={styles['form-wrapper']}>
      <div className={styles['field']}>
        <label className={styles['label']}>
          <Typography as="span" variant="text15" weight="bold">
            닉네임
          </Typography>
        </label>

        <div className={styles['input-area']}>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className={styles['underline-input']}
          />
          <ul className={styles['helper-text']}>
            <li>
              <Typography as="span" variant="text12">
                &#8226; &nbsp;영어, 한글, 숫자 포함 30자 이내
              </Typography>
            </li>
            <li>
              <Typography as="span" variant="text12">
                &#8226; &nbsp;태그, 이모지 및 특수 문자 불가능
              </Typography>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles['field']}>
        <label className={styles['label']}>
          <Typography as="span" variant="text15" weight="bold">
            생년월일
          </Typography>
        </label>
        <DatePicker value={birthdate} onChange={setBirthdate} />
      </div>
      <div className={styles['field']}>
        <label className={styles['label']}>
          <Typography as="span" variant="text15" weight="bold">
            성별
          </Typography>
        </label>
        <GenderSelector value={gender} onChange={setGender} />
      </div>
      <BottomButton
        variant="primary"
        onClick={handleSubmit}
        disabled={!isValid}
      >
        완료
      </BottomButton>
    </div>
  )
}
