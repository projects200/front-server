export type UserProfileDto = {
  nickname: string
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN'
  bio: string
}

export type PreferExercisesDto = {
  preferredExerciseId: number
  name: string
  skillLevel: string
  daysOfWeek: boolean[]
  imageUrl: string
}

export type UserFullProfileDto = UserProfileDto & {
  profileThumbnailUrl: string
  profileImageUrl: string
  birthDate: string
  yearlyExerciseDays: number
  exerciseCountInLast30Days: number
  exerciseScore: number
  preferredExercises: PreferExercisesDto[]
}
