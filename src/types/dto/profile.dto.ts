export type ProfileImgDto = {
  profileImageId: number
  profileImageUrl: string
}

export type ProfileImgInfoDto = ProfileImgDto & {
  profileImageName: string
  profileImageExtension: string
}

export type PorfileImgGroupDto = {
  representativeProfileImage: ProfileImgInfoDto
  profileImageCount: number
  profileImages: ProfileImgInfoDto[]
}
