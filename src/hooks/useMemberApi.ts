import { readMemberScore } from '@/api/member'
import { adaptMemberScore } from '@/lib/adapters/member.adapter'
import { MemberScore } from '@/types/member'

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
