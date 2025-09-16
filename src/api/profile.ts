import { PorfileImgGroupDto, ProfileImgDto } from '@/types/dto/profile.dto'
import { fetchWrapper } from '@/utils/fetchWrapper'

// 프로필 사진 생성
export function createProfilePicture(
  token: string,
  profilePicture: File,
): Promise<ProfileImgDto> {
  const formData = new FormData()
  formData.append('profilePicture', profilePicture)
  return fetchWrapper<ProfileImgDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/profile-pictures`,
    {
      method: 'POST',
      body: formData,
    },
    token,
  )
}

// 프로필 사진 전체 조회
export function readProfilePictureGroup(
  token: string,
): Promise<PorfileImgGroupDto> {
  return fetchWrapper<PorfileImgGroupDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/profile-pictures`,
    {
      method: 'GET',
    },
    token,
  )
}

// 대표 프로필 사진 수정
export function updateRepProfilePicture(
  token: string,
  pictureId: number,
): Promise<{ representativeProfileImageId: number }> {
  return fetchWrapper<{ representativeProfileImageId: number }>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/profile-pictures/${pictureId}/represent`,
    {
      method: 'PUT',
    },
    token,
  )
}

// 프로필 사진 삭제
export function removeProfilePicture(
  token: string,
  pictureId: number,
): Promise<null> {
  return fetchWrapper<null>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/profile-pictures/${pictureId}`,
    {
      method: 'DELETE',
    },
    token,
  )
}
