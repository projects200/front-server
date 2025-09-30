import {
  readMemberScore,
  readMemberExerciseLocation,
  readMemberExerciseRange,
} from '@/api/member'
import {
  adaptMemberScore,
  adapterMemberProfileList,
} from '@/lib/adapters/member.adapter'
import { adaptExerciseRange } from '@/lib/adapters/exercise.adapter'
import { MemberScore, MemberProfile } from '@/types/member'
import { ExerciseRange } from '@/types/exercise'
import SITE_MAP from '@/constants/siteMap.constant'

import useApiGet from './useApiGet'

// 회원 운동점수 조회
export const useReadMemberScore = () =>
  useApiGet<MemberScore>(
    ['member/score'],
    (token) => readMemberScore(token).then(adaptMemberScore),
    {
      policy: { messages: { 404: '존재하지 않는 회원입니다.' } },
    },
  )

// 다른 회원 운동장소 목록 조회
export const useReadMemberExerciseLocation = () =>
  useApiGet<MemberProfile[]>(
    ['member/exerciseLocation'],
    (token) => readMemberExerciseLocation(token).then(adapterMemberProfileList),
    {},
  )

// 다른 회원 캘린더 조회(운동 기록 기간 조회)
export const useReadMemberExerciseRange = (
  memberId: string,
  startDate: string,
  endDate: string,
  shouldFetch: boolean,
) =>
  useApiGet<ExerciseRange[]>(
    ['member/exerciseRange', memberId, startDate.substring(0, 7)],
    (token) =>
      readMemberExerciseRange(token, memberId, startDate, endDate).then(
        adaptExerciseRange,
      ),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      shouldFetch,
      policy: {
        messages: { 400: '유효하지 않은 날짜입니다.' },
        actions: { 400: { type: 'redirect', to: SITE_MAP.EXERCISE } },
      },
    },
  )
