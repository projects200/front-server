export type UserProfileDto = {
  nickname: string
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN'
  bio: string
}

export type UserProfilePreferExerciseDto = {
  preferredExerciseId: number
  name: string
  skillLevel: string
  daysOfWeek: boolean[]
  imageUrl: string | null
}

export type UserFullProfileDto = UserProfileDto & {
  profileThumbnailUrl: string
  profileImageUrl: string
  birthDate: string
  yearlyExerciseDays: number
  exerciseCountInLast30Days: number
  exerciseScore: number
  preferredExercises: UserProfilePreferExerciseDto[]
}

export type ExerciseItemDto = {
  exerciseId: number
  exerciseName: string
  imageUrl: string | null
}

export type PreferExerciseDto = {
  preferredExerciseId: number
  exerciseTypeId: number
  exerciseName: string
  skillLevel: string
  daysOfWeek: boolean[]
  imageUrl: string | null
}

export type PreferExerciseFormDto = {
  exerciseTypeId: number
  skillLevel: string
  daysOfWeek: boolean[]
}
