import { UserProfile, UserFullProfile, UserProfilePreferExercise, ExerciseItem, PreferExercise, PreferExerciseForm } from '@/types/mypage'
import { UserProfileDto, UserFullProfileDto, UserProfilePreferExerciseDto, ExerciseItemDto, PreferExerciseDto, PreferExerciseFormDto } from '@/types/dto/mypage.dto'

export function adapterUserProfile(dto: UserProfileDto): UserProfile {
  return {
    nickname: dto.nickname,
    gender: dto.gender,
    bio: dto.bio,
  }
}

export function adapterProfilePreferExercise(dto: UserProfilePreferExerciseDto): UserProfilePreferExercise {
  return {
    preferredExerciseId: dto.preferredExerciseId,
    name: dto.name,
    skillLevel: dto.skillLevel,
    daysOfWeek: dto.daysOfWeek,
    imageUrl: dto.imageUrl,
  }
}

export function adapterUserFullProfile(dto: UserFullProfileDto): UserFullProfile {
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
    preferredExercises: dto.preferredExercises.map(adapterProfilePreferExercise),
  }
}

export function adapterExerciseItem(dto: ExerciseItemDto): ExerciseItem {
  return {
    exerciseTypeId: dto.exerciseId,
    name: dto.exerciseName,
    imageUrl: dto.imageUrl,
  }
}

export function adapterExerciseItemList(dtoList: ExerciseItemDto[]): ExerciseItem[] {
  return dtoList.map((dto) => adapterExerciseItem(dto))
}

export function adapterPreferExercise(dto: PreferExerciseDto): PreferExercise {
  return {
    preferredExerciseId: dto.preferredExerciseId,
    exerciseTypeId: dto.exerciseTypeId,
    name: dto.exerciseName,
    skillLevel: dto.skillLevel,
    daysOfWeek: dto.daysOfWeek,
    imageUrl: dto.imageUrl,
  }
}

export function adapterPreferExerciseList(dtoList: PreferExerciseDto[]): PreferExercise[] {
  return dtoList.map((dto) => adapterPreferExercise(dto))
}

export function adapterPreferExerciseItemToDto(dto: PreferExerciseForm): PreferExerciseFormDto {
  return {
    exerciseTypeId: dto.exerciseTypeId,
    skillLevel: dto.skillLevel,
    daysOfWeek: dto.daysOfWeek,
  }
}

export function adapterPreferExerciseFormToDto(itemList: PreferExerciseForm[]): PreferExerciseFormDto[] {
  return itemList.map((item) => adapterPreferExerciseItemToDto(item))
}
