import { UserProfile, UserFullProfile, PreferExercises } from '@/types/mypage'
import {
  UserProfileDto,
  UserFullProfileDto,
  PreferExercisesDto,
} from '@/types/dto/mypage.dto'

export function adapterUserProfile(dto: UserProfileDto): UserProfile {
  return {
    nickname: dto.nickname,
    gender: dto.gender,
    bio: dto.bio,
  }
}

export function adapterPreferExercises(
  dto: PreferExercisesDto,
): PreferExercises {
  return {
    preferredExerciseId: dto.preferredExerciseId,
    name: dto.name,
    skillLevel: dto.skillLevel,
    daysOfWeek: dto.daysOfWeek,
    imageUrl: dto.imageUrl,
  }
}

export function adapterUserFullProfile(
  dto: UserFullProfileDto,
): UserFullProfile {
  return {
    nickname: dto.nickname,
    gender: dto.gender,
    bio: dto.bio,
    profileThumbnailUrl: dto.profileThumbnailUrl,
    profileImageUrl: dto.profileImageUrl,
    birthDate: dto.birthDate,
    yearlyExerciseDays: dto.yearlyExerciseDays,
    exerciseCountInLast30Days: dto.exerciseCountInLast30Days,
    exerciseScore: dto.exerciseScore,
    preferredExercises: dto.preferredExercises.map(adapterPreferExercises),
  }
}
