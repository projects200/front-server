import { ProfileImg, ProfileImgInfo, PorfileImgGroup } from '@/types/profile'
import {
  ProfileImgDto,
  ProfileImgInfoDto,
  PorfileImgGroupDto,
} from '@/types/dto/profile.dto'

export function adapterProfileImg(dto: ProfileImgDto): ProfileImg {
  return {
    pictureId: dto.profileImageId,
    profileImageUrl: dto.profileImageUrl,
  }
}

export function adapterProfileImgInfo(dto: ProfileImgInfoDto): ProfileImgInfo {
  return {
    pictureId: dto.profileImageId,
    profileImageUrl: dto.profileImageUrl,
    profileImageName: dto.profileImageName,
    profileImageExtension: dto.profileImageExtension,
  }
}


export function adapterProfileImgGroup(
  dto: PorfileImgGroupDto,
): PorfileImgGroup {
  return {
    representativeProfileImage: adapterProfileImgInfo(dto.representativeProfileImage),
    profileImageCount: dto.profileImageCount,
    profileImages: dto.profileImages.map(adapterProfileImgInfo),
  }
}
