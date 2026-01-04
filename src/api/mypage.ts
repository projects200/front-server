import { fetchWrapper } from '@/utils/fetchWrapper'
import { UserProfile } from '@/types/mypage'
import {
  UserProfileDto,
  UserFullProfileDto,
  ExerciseItemDto,
  PreferExerciseDto,
} from '@/types/dto/mypage.dto'
import { PreferExerciseForm } from '@/types/mypage'
import { adapterPreferExerciseFormToDto } from '@/lib/adapters/mypage.adapter'

/***  프로필  ***/
// 유저 전체 프로필 조회
export function readUserFullProfile(
  token: string,
): Promise<UserFullProfileDto> {
  return fetchWrapper<UserFullProfileDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/profile`,
    { method: 'GET' },
    token,
  )
}

// 다른 유저 전체 프로필 조회
export function readOtherUserFullProfile(
  token: string,
  memberId: string,
): Promise<UserFullProfileDto> {
  return fetchWrapper<UserFullProfileDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/members/${memberId}/profile`,
    { method: 'GET' },
    token,
  )
}

// 유저 프로필 수정
export function updateUserProfile(
  token: string,
  data: UserProfile,
): Promise<UserProfileDto> {
  return fetchWrapper<UserProfileDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/profile`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
    },
    token,
  )
}

/***  선호운동  ***/
// 선호운동 종류 조회
export function readExerciseTypeList(
  token: string,
): Promise<ExerciseItemDto[]> {
  return fetchWrapper<ExerciseItemDto[]>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercise-types`,
    { method: 'GET' },
    token,
  )
}

// 유저 선호운동 조회
export function readPreferredExerciseList(
  token: string,
): Promise<PreferExerciseDto[]> {
  return fetchWrapper<PreferExerciseDto[]>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/preferred-exercises`,
    { method: 'GET' },
    token,
  )
}

// 유저 선호운동 생성
export function createPreferredExerciseList(
  token: string,
  data: PreferExerciseForm[],
): Promise<PreferExerciseDto[]> {
  const dto: PreferExerciseForm[] = adapterPreferExerciseFormToDto(data)
  return fetchWrapper<PreferExerciseDto[]>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/preferred-exercises`,
    { method: 'POST', body: JSON.stringify(dto) },
    token,
  )
}

// 유저 선호운동 수정
export function updatePreferredExerciseList(
  token: string,
  data: PreferExerciseForm[],
): Promise<PreferExerciseDto[]> {
  const dto: PreferExerciseForm[] = adapterPreferExerciseFormToDto(data)
  return fetchWrapper<PreferExerciseDto[]>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/preferred-exercises`,
    { method: 'PATCH', body: JSON.stringify(dto) },
    token,
  )
}

// 유저 선호운동 삭제
export function deletePreferredExerciseList(
  token: string,
  data: number[],
): Promise<null> {
  return fetchWrapper<null>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/preferred-exercises`,
    { method: 'DELETE', body: JSON.stringify({ preferredExerciseIds: data }) },
    token,
  )
}
