export type ProfileImg = {
  pictureId: number
  profileImageUrl: string
}

export type ProfileImgInfo = ProfileImg & {
  profileImageName: string
  profileImageExtension: string
}

export type PorfileImgGroup = {
  representativeProfileImage: ProfileImgInfo | null
  profileImageCount: number
  profileImages: ProfileImgInfo[]
}