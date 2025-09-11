'use client'

import { forwardRef, useImperativeHandle } from 'react'
import * as z from 'zod'
import { useForm } from '@tanstack/react-form'
import Typography from '@/components/ui/typography'

import ProfileImageField from './profileImageField'
import NicknameField from './nicknameField'
import GenderField from './genderField'
import styles from './profileEditForm.module.css'

export type ProfileEditFormHandle = { submit: () => void }

export type ProfileEditFormValues = {
  profileImage: File | null
  nickname: string
  isNicknameChecked: boolean
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN'
  bio: string
}

type DefaultValues = {
  profileImageUrl: string | null
  nickname: string
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN'
  bio: string
}

type Props = {
  defaultValues: DefaultValues
  onSubmit: (values: ProfileEditFormValues) => void
  onError: (message: string) => void
}

const profileEditSchema = (initialNickname: string) =>
  z
    .object({
      profileImage: z
        .instanceof(File)
        .refine(
          (file) => file.size <= 10 * 1024 * 1024,
          '이미지 파일 크기는 10MB 이하만 가능합니다.',
        )
        .refine(
          (file) =>
            ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
          'jpg, jpeg, png 파일만 업로드할 수 있습니다.',
        )
        .nullable(),
      nickname: z
        .string()
        .trim()
        .min(1, '닉네임을 입력해주세요.')
        .max(30, '닉네임은 최대 30자까지 가능합니다.')
        .regex(
          /^[a-zA-Z0-9가-힣]+$/,
          '닉네임은 영어, 한글, 숫자만 사용 가능합니다.',
        )
        .refine(
          (val) => val.trim().length > 0,
          '공백만으로는 입력할 수 없습니다.',
        ),
      gender: z.enum(['MALE', 'FEMALE', 'UNKNOWN']),
      bio: z.string().max(500, '자기소개는 최대 500자까지 가능합니다.'),
      isNicknameChecked: z.boolean(),
    })
    .refine(
      (data) => {
        if (data.nickname === initialNickname) {
          return true
        }
        return data.isNicknameChecked === true
      },
      {
        message: '닉네임 중복 확인을 완료해주세요.',
        path: ['nickname'],
      },
    )

const ProfileEditForm = forwardRef<ProfileEditFormHandle, Props>(
  ({ defaultValues, onSubmit, onError }, ref) => {
    const form = useForm({
      defaultValues: {
        profileImage: null as File | null,
        nickname: defaultValues.nickname,
        isNicknameChecked: true,
        gender: defaultValues.gender,
        bio: defaultValues.bio,
      },
      validators: { onSubmit: profileEditSchema(defaultValues.nickname) },
      canSubmitWhenInvalid: true,
      onSubmitInvalid: ({ formApi }) => {
        const fieldErrorMap = formApi.state.errorMap?.onSubmit as Record<
          string,
          z.ZodIssue[]
        >
        const firstIssueArr = Object.values(fieldErrorMap)[0]
        onError(firstIssueArr?.[0]?.message ?? '입력값을 확인해주세요.')
      },
      onSubmit: ({ value }) => onSubmit(value),
    })

    useImperativeHandle(ref, () => ({ submit: () => form.handleSubmit() }))

    return (
      <form
        className={styles['form']}
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit(e)
        }}
      >
        {/* 1. 프로필 사진 영역 */}

        <form.Field name="profileImage">
          {(field) => (
            <div className={styles['profile-img-section']}>
              <ProfileImageField
                value={field.state.value}
                onChange={field.handleChange}
                defaultImageUrl={defaultValues.profileImageUrl}
              />
            </div>
          )}
        </form.Field>

        {/* 2. 닉네임 영역 (다음 스탭에서 컴포넌트로 교체) */}
        <form.Field name="nickname">
          {(nicknameField) => (
            <form.Field name="isNicknameChecked">
              {(isCheckedField) => (
                <div className={styles['nickname-section']}>
                  <NicknameField
                    value={nicknameField.state.value}
                    onChange={(newNickname, newIsChecked) => {
                      nicknameField.handleChange(newNickname)
                      isCheckedField.handleChange(newIsChecked)
                    }}
                    initialNickname={defaultValues.nickname}
                  />
                </div>
              )}
            </form.Field>
          )}
        </form.Field>

        {/* 3. 성별 영역 (다음 스탭에서 컴포넌트로 교체) */}
        <form.Field name="gender">
          {(field) => (
            <div className={styles['gender-section']}>
              <GenderField
                value={field.state.value}
                onChange={field.handleChange}
              />
            </div>
          )}
        </form.Field>

        {/* 4. 자기소개 영역 */}
        <form.Field name="bio">
          {(field) => (
            <div className={styles['bio-section']}>
              <label className={styles['label']}>
                <Typography as="span" variant="text15" weight="bold">
                  자기소개
                </Typography>
              </label>
              <textarea
                id="bio"
                name={field.name}
                value={field.state.value ?? ''}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={styles['bio-textarea']}
                placeholder="자기소개를 입력해서 자신에 대해 알려주세요!"
                maxLength={500}
              />
            </div>
          )}
        </form.Field>
      </form>
    )
  },
)

ProfileEditForm.displayName = 'ProfileEditForm'
export default ProfileEditForm
