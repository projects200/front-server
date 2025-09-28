'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryState, parseAsFloat, parseAsString } from 'nuqs'
import * as z from 'zod'
import { useForm } from '@tanstack/react-form'

import MarkerIcon from '@/assets/map_marker_black.svg'
import InfoIcon from '@/assets/icon_warning.svg'
import Header from '@/components/commons/header'
import Typography from '@/components/ui/typography'
import BottomButton from '@/components/commons/bottomButton'
import { usePostExerciseLocation } from '@/hooks/api/useExerciseLocationApi'
import { useToast } from '@/hooks/useToast'
import SITE_MAP from '@/constants/siteMap.constant'

import styles from './placeRegisterDetail.module.css'

const placeRegisterSchema = z.object({
  placeName: z
    .string()
    .min(1, '장소명을 입력해주세요.')
    .max(100, '장소명은 최대 100자까지 입력 가능합니다.')
    .refine(
      (val) => val.trim().length > 0,
      '장소명을 공백만으로 입력할 수 없습니다.',
    ),
})

export default function PlaceRegisterDetail() {
  const { trigger: createExerciseLocation } = usePostExerciseLocation()
  const router = useRouter()
  const showToast = useToast()
  const [lat] = useQueryState('lat', parseAsFloat)
  const [lng] = useQueryState('lng', parseAsFloat)
  const [initialName] = useQueryState('name', parseAsString)
  const [address] = useQueryState('address', parseAsString)
  const isExist = address === null || lat === null || lng === null

  const form = useForm({
    defaultValues: {
      placeName: initialName || '',
    },
    validators: {
      onSubmit: placeRegisterSchema,
    },
    canSubmitWhenInvalid: true,
    onSubmitInvalid: ({ formApi }) => {
      const fieldErrorMap = formApi.state.errorMap.onSubmit as Record<
        string,
        z.ZodIssue[]
      >
      const firstIssueArr = Object.values(fieldErrorMap)[0]
      showToast(firstIssueArr?.[0]?.message ?? '입력값을 확인해주세요.', 'info')
    },
    onSubmit: async ({ value }) => {
      if (isExist) {
        showToast('잘못된 접근입니다. 장소를 다시 선택해주세요.', 'info')
        router.back()
        return
      }
      try {
        await createExerciseLocation({
          name: value.placeName,
          address: address,
          latitude: lat,
          longitude: lng,
        })
        showToast('운동장소가 등록되었습니다.', 'info')
        router.replace(SITE_MAP.MATCH_PLACE_LIST)
      } catch {}
    },
  })

  useEffect(() => {
    if (initialName) {
      form.setFieldValue('placeName', initialName)
    }
  }, [initialName, form])

  if (isExist) return null

  return (
    <div className={styles['container']}>
      <Header onBack={() => router.back()}>운동장소 등록</Header>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className={styles['contents']}>
          {/* 1. 장소 표시 */}
          <div className={styles['place-display']}>
            <MarkerIcon className={styles['marker-icon']} />
            <div className={styles['place-text']}>
              {initialName === '' ? (
                <Typography variant="content-large" weight="bold">
                  <form.Subscribe selector={(state) => state.values.placeName}>
                    {(placeName) =>
                      placeName || initialName || '장소명을 입력해주세요'
                    }
                  </form.Subscribe>
                </Typography>
              ) : (
                <Typography variant="content-large" weight="bold">
                  {initialName}
                </Typography>
              )}
              <Typography variant="content-large">{address}</Typography>
            </div>
          </div>

          {/* 2. 장소명 */}
          {initialName === '' ? (
            <div className={styles['place-input-section']}>
              <Typography as="h2" variant="content-large" weight="bold">
                장소명(필수)
              </Typography>
              <form.Field name="placeName">
                {(field) => (
                  <input
                    className={styles['place-input']}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="장소명을 입력해주세요"
                    maxLength={100}
                  />
                )}
              </form.Field>
            </div>
          ) : (
            <></>
          )}

          {/* 3. 안내 문구 */}
          <div className={styles['info-section']}>
            <div className={styles['info-title']}>
              <InfoIcon className={styles['info-icon']} />
              <Typography as="span" variant="content-small" weight="bold">
                등록하신 운동 장소는 다른 이용자에게 공개됩니다.
              </Typography>
            </div>
            <Typography
              as="span"
              variant="content-small"
              className={styles['info-margin']}
            >
              회원님이 등록하는 운동 장소 정보는
              <br /> 운동 메이트를 찾기 위한 목적으로 다른 이용자들에게
              공개됩니다.
            </Typography>
            <div className={styles['info-content']}>
              <Typography as="span" variant="content-small">
                - 제공받는 자: 본 서비스를 이용하는 다른 모든 회원
              </Typography>
              <Typography as="span" variant="content-small">
                - 제공하는 정보: 회원님이 등록한 운동 장소의 위치 정보
              </Typography>
              <Typography as="span" variant="content-small">
                - 보유 및 이용 기간: 회원 탈퇴 또는 해당 운동 장소 삭제 시까지
              </Typography>
            </div>
          </div>
        </div>

        {/* 4. 등록 버튼 */}
        <BottomButton type="submit">주소 등록</BottomButton>
      </form>
    </div>
  )
}
