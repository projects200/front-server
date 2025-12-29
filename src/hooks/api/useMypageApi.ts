import {
  updateUserProfile,
  readOtherUserFullProfile,
  readUserFullProfile,
  readExerciseTypeList,
  readPreferredExerciseList,
  createPreferredExerciseList,
} from '@/api/mypage'
import {
  adapterUserFullProfile,
  adapterExerciseItemList,
  adapterPreferExerciseList,
} from '@/lib/adapters/mypage.adapter'
import {
  UserProfile,
  UserFullProfile,
  ExerciseItem,
  PreferExercise,
  PreferExerciseForm,
} from '@/types/mypage'
import { UserProfileDto, PreferExerciseDto } from '@/types/dto/mypage.dto'

import useApiGet from './useApiGet'
import useApiMutation from './useApiMutation'

/***  프로필  ***/
// 유저 전체 프로필 조회
export const useReadUserFullProfile = () =>
  useApiGet<UserFullProfile>(
    ['mypage/fullProfile'],
    (token) => readUserFullProfile(token).then(adapterUserFullProfile),
    {
      revalidateOnFocus: true,
      revalidateOnMount: true,
    },
  )

// 다른 유저 전체 프로필 조회
export const useReadOtherUserFullProfile = (memberId: string) =>
  useApiGet<UserFullProfile>(
    ['mypage/other/fullProfile'],
    (token) =>
      readOtherUserFullProfile(token, memberId).then(adapterUserFullProfile),
    {
      policy: {
        messages: {
          400: '자신의 운동장소 입니다.',
        },
        actions: { 400: 'back' },
      },
    },
  )

// 유저 프로필 수정
export const usePutUserProfile = () =>
  useApiMutation<UserProfileDto, UserProfile>(
    ['mypage/fullProfile'],
    (token, body) => updateUserProfile(token, body),
    {},
  )

/***  선호운동  ***/
// 선호운동 종류 조회
export const useReadExerciseTypeList = () =>
  useApiGet<ExerciseItem[]>(
    ['exerciseItem'],
    (token) => readExerciseTypeList(token).then(adapterExerciseItemList),
    {},
  )

// 유저 선호운동 조회
export const useReadPreferredExerciseList = () =>
  useApiGet<PreferExercise[]>(
    ['mypage/preferExercise'],
    (token) => readPreferredExerciseList(token).then(adapterPreferExerciseList),
    {},
  )

// 유저 선호운동 생성
export const usePostPreferredExerciseFormList = () =>
  useApiMutation<PreferExerciseDto[], PreferExerciseForm[]>(
    ['mypage/preferExercise/create'],
    (token, body) => createPreferredExerciseList(token, body),
    {},
  )
