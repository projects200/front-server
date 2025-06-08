import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { ApiError } from '@/types/common'
import { useToast } from '@/hooks/useToast'
import { useReadExercise } from '@/hooks/exercise/useGetExerciseApi'
import SITE_MAP from '@/constants/siteMap.constant'

import InputField from '../../_components/inputField'
import TextareaField from '../../_components/textareaField'
import DateTimePicker from '../../_components/dateTimePicker'
import ImageField from './imageField'
import styles from './exerciseDetail.module.css'

type Props = {
  exerciseId: number
}

export default function ExerciseDetail({ exerciseId }: Props) {
  const showToast = useToast()
  const router = useRouter()
  const { isLoading, data, error } = useReadExercise(exerciseId)

  useEffect(() => {
    if (!isLoading && error) {
      if (error instanceof ApiError) {
        if (error.status === 401) {
          showToast('인증이 만료되었습니다. 다시 로그인해주세요.', 'info')
          router.replace(SITE_MAP.LOGIN)
          return
        }
        showToast(error.message, 'info')
      } else {
        showToast(error.message || '서버 오류가 발생했습니다.', 'info')
      }
      router.back()
      return
    } else if (!isLoading && !data) {
      showToast('데이터를 불러올 수 없습니다.', 'info')
      router.back()
      return
    }
  }, [isLoading, data, error])

  if (isLoading) return null
  if (error) return null
  if (!data) return null

  return (
    <>
      {data.images?.length ? <ImageField images={data.images} /> : <></>}
      <InputField value={data.title} label="제목" id="title" readonly={true} />
      <DateTimePicker
        label="운동 시간"
        startedAt={data.startedAt}
        endedAt={data.endedAt}
        readonly={true}
      />
      {data.category && (
        <InputField
          value={data.category}
          label="운동 종류"
          id="category"
          readonly={true}
        />
      )}
      {data.location && (
        <InputField
          value={data.location}
          label="장소"
          id="location"
          readonly={true}
        />
      )}

      {data.content && (
        <TextareaField
          className={styles['text-field']}
          value={data.content}
          label="내용"
          id="content"
          readonly={true}
        />
      )}
    </>
  )
}
