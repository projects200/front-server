'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { ApiError } from '@/types/common'
import { ExerciseRecordRes } from '@/types/exercise'
import SITE_MAP from '@/constants/siteMap.constant'
import { useToast } from '@/hooks/useToast'
import { useExerciseApi } from '@/hooks/useExerciseApi'

import ExerciseDetail from './_components/exerciseDetail'
import LoadingScreen from '@/components/commons/loadingScreen'

type Props = {
  exerciseId: number
}

export default function ExerciseDetailContainer({ exerciseId }: Props) {
  const [isLoading, setLoading] = useState(true)
  const [exerciseRecord, setExerciseRecord] =
    useState<ExerciseRecordRes | null>(null)
  const { getExerciseDetail } = useExerciseApi()
  const showToast = useToast()
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      try {
        const data = await getExerciseDetail(exerciseId)
        setExerciseRecord(data)
      } catch (err: unknown) {
        if (err instanceof ApiError) {
          if (err.status === 401) {
            showToast('인증이 만료되었습니다. 다시 로그인해주세요.', 'info')
            router.replace(SITE_MAP.LOGIN)
          } else {
            showToast(err.message, 'info')
            router.back()
          }
        } else if (err instanceof Error) {
          showToast(err.message, 'info')
          router.back()
        } else {
          showToast('서버 오류가 발생했습니다.', 'info')
          router.back()
        }
      }
      setLoading(false)
    })()
  }, [])

  if (isLoading || !exerciseRecord) return <LoadingScreen />
  return <ExerciseDetail {...exerciseRecord} />
}
