import { mutate } from 'swr'

import {
  readProfilePictureGroup,
  createProfilePicture,
  updateRepProfilePicture,
  removeProfilePicture,
} from '@/api/profile'
import { adapterProfileImgGroup } from '@/lib/adapters/profile.adapter'
import { PorfileImgGroup } from '@/types/profile'
import { ProfileImgDto } from '@/types/dto/profile.dto'

import useApiGet from './useApiGet'
import useApiMutation from './useApiMutation'

// 프로필 사진 전체 조회
export const useReadProfilePictureGroup = () =>
  useApiGet<PorfileImgGroup>(
    ['profile/pictures'],
    (token) => readProfilePictureGroup(token).then(adapterProfileImgGroup),
    {},
  )

// 프로필 사진 생성
export const usePostProfilePicture = () =>
  useApiMutation<ProfileImgDto, { profilePicture: File }>(
    ['profile/pictures'],
    (token, body) => createProfilePicture(token, body.profilePicture),
    {
      onSuccess: async () => {
        await mutate(['mypage/fullProfile'])
      },
    },
  )

// 대표 프로필 사진 수정
export const usePutRepProfilePicture = () =>
  useApiMutation<
    { representativeProfileImageId: number },
    { pictureId: number }
  >(
    ['profile/pictures'],
    (token, body) => updateRepProfilePicture(token, body.pictureId),
    {
      onSuccess: async () => {
        await mutate(['mypage/fullProfile'])
      },
    },
  )

// 프로필 사진 삭제
export const useDeleteProfilePicture = () =>
  useApiMutation<null, { pictureId: number }>(
    ['profile/pictures'],
    (token, body) => removeProfilePicture(token, body.pictureId),
    {
      policy: {
        messages: {
          500: '이미지 삭제에 실패했습니다.',
        },
      },
      onSuccess: async () => {
        await mutate(['mypage/fullProfile'])
      },
    },
  )
