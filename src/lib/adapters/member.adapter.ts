import {
  MemberScore,
  MemberExerciseLocation,
  MemberProfile,
} from '@/types/member'
import {
  MemberSocreDto,
  MemberExerciseLocationDto,
  MemberProfileDto,
} from '@/types/dto/member.dto'

export function adaptMemberScore(dto: MemberSocreDto): MemberScore {
  return {
    memberId: dto.memberId,
    memberScore: dto.memberScore,
    maxScore: dto.policyMaxScore,
    minScore: dto.policyMinScore,
  }
}

export function adapterMemberExerciseLocation(
  dto: MemberExerciseLocationDto,
): MemberExerciseLocation {
  return {
    exerciseLocationName: dto.exerciseLocationName,
    latitude: dto.latitude,
    longitude: dto.longitude,
  }
}

export function adapterMemberProfile(dto: MemberProfileDto): MemberProfile {
  return {
    memberId: dto.memberId,
    profileThumbnailUrl: dto.profileThumbnailUrl,
    profileImageUrl: dto.profileImageUrl,
    nickname: dto.nickname,
    gender: dto.gender,
    birthDate: dto.birthDate,
    locationList: dto.locations.map(adapterMemberExerciseLocation),
  }
}

export function adapterMemberProfileList(
  dtoList: MemberProfileDto[],
): MemberProfile[] {
  return dtoList.map((dto) => adapterMemberProfile(dto))
}
