import { MemberSocreDto, MemberProfileDto } from '@/types/dto/member.dto'
import { ExerciseRangeResDto } from '@/types/dto/exercise.dto'
import { fetchWrapper } from '@/utils/fetchWrapper'

// 회원 운동점수 조회
export function readMemberScore(token: string): Promise<MemberSocreDto> {
  return fetchWrapper<MemberSocreDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/members/score`,
    {
      method: 'GET',
    },
    token,
  )
}

// 다른 회원 운동장소 목록 조회
export function readMemberExerciseLocation(
  token: string,
): Promise<MemberProfileDto[]> {
  return fetchWrapper<MemberProfileDto[]>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/members`,
    {
      method: 'GET',
    },
    token,
  )
}

// 다른 회원 캘린더 조회(운동 기록 기간 조회)
export function readMemberExerciseRange(
  token: string,
  memberId: string,
  startDate: string,
  endDate: string,
): Promise<ExerciseRangeResDto[]> {
  return fetchWrapper<ExerciseRangeResDto[]>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/members/${memberId}/calendars?start=${startDate}&end=${endDate}`,
    {
      method: 'GET',
    },
    token,
  )
}
