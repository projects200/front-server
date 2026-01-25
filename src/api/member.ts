import type { MemberLocationParams } from '@/types/member'
import type { MemberSocreDto, MemberProfileDto } from '@/types/dto/member.dto'
import type { ExerciseRangeResDto } from '@/types/dto/exercise.dto'
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
export async function readMemberExerciseLocation(
  token: string,
  params: MemberLocationParams,
): Promise<MemberProfileDto[]> {
  const queryParams = new URLSearchParams({
    leftTopLatitude: params.leftTopLatitude.toString(),
    leftTopLongitude: params.leftTopLongitude.toString(),
    rightBottomLatitude: params.rightBottomLatitude.toString(),
    rightBottomLongitude: params.rightBottomLongitude.toString(),
  })

  const timer = new Promise((resolve) => setTimeout(resolve, 500))

  const fetchPromise = fetchWrapper<MemberProfileDto[]>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/members?${queryParams.toString()}`,
    {
      method: 'GET',
    },
    token,
  )

  const [res] = await Promise.all([fetchPromise, timer])

  return res
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
