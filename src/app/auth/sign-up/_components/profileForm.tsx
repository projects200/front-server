'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { mutate } from 'swr'

import LoadingScreen from '@/components/commons/loadingScreen'
import BottomButton from '@/components/commons/bottomButton'
import Typography from '@/components/ui/typography'
import { useToast } from '@/hooks/useToast'
import {
  validateNickname,
  validateBirthdate,
  validateGender,
} from '@/utils/validation'
import { usePostUser } from '@/hooks/api/useAuthApi'
import { usePostFcmToken } from '@/hooks/api/useFcmApi'
import { requestFcmToken } from '@/lib/firebase/config'
import SITE_MAP from '@/constants/siteMap.constant'

import DatePicker from './datePicker'
import GenderSelector from './genderSelector'
import styles from './profileForm.module.css'

export default function ProfileForm() {
  const [nickname, setNickname] = useState('')
  const [birthdate, setBirthdate] = useState<string | null>(null)
  const [gender, setGender] = useState<'M' | 'F' | 'U' | null>(null)
  const router = useRouter()
  const showToast = useToast()
  const { trigger: postUser, isMutating: isPostingUser } = usePostUser()
  const { trigger: registerToken, isMutating: isPostingFcmToken } =
    usePostFcmToken()

  const isProcessing = isPostingUser || isPostingFcmToken
  const isValid =
    nickname.trim() !== '' && birthdate !== null && gender !== null

  async function handleSubmit() {
    const nicknameCheck = validateNickname(nickname.trim())
    if (!nicknameCheck.valid) {
      showToast(nicknameCheck.error!, 'info')
      return
    }

    if (birthdate === null) {
      showToast('생년월일을 입력해주세요.', 'info')
      return
    }

    const birthdateCheck = validateBirthdate(birthdate.trim())
    if (!birthdateCheck.valid) {
      showToast(birthdateCheck.error!, 'info')
      return
    }

    const genderCheck = validateGender(gender)
    if (!genderCheck.valid) {
      showToast(genderCheck.error!, 'info')
      return
    }
    try {
      await postUser({ nickname, birthdate: birthdate!, gender: gender! })
      mutate(
        ['auth/isRegistered'],
        { isRegistered: true },
        { revalidate: false },
      )
      showToast('회원가입이 완료되었습니다!', 'info')
    } catch {}

    try {
      const fcmToken = await requestFcmToken()
      if (fcmToken) {
        await registerToken(fcmToken)
        sessionStorage.setItem('fcm_token', fcmToken)
        console.log('FCM 등록 완료')
      }
      router.push(SITE_MAP.EXERCISE)
      return
    } catch (err) {
      console.log('FCM 등록 오류 : ', err)
      router.push(SITE_MAP.EXERCISE)
      return
    }
  }

  return (
    <>
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
      {isProcessing && <LoadingScreen />}
    </>
  )
}
