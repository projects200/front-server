export type UserProfile = {
  nickname: string
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN'
  bio: string
}

export type UserProfilePreferExercise = {
  preferredExerciseId: number
  name: string
  skillLevel: string
  daysOfWeek: boolean[]
  imageUrl: string | null
}

export type UserFullProfile = UserProfile & {
  profileThumbnailUrl: string
  profileImageUrl: string
  birthDate: string
  yearlyExerciseDays: number
  exerciseCountInLast30Days: number
  exerciseScore: number
  preferredExercises: UserProfilePreferExercise[]
}

export type ExerciseItem = {
  exerciseTypeId: number
  name: string
  imageUrl: string | null
}

export type PreferExercise = {
  preferredExerciseId: number
  exerciseTypeId: number
  name: string
  skillLevel: string
  daysOfWeek: boolean[]
  imageUrl: string | null
}

export type PreferExerciseForm = {
  exerciseTypeId: number
  skillLevel: string
  daysOfWeek: boolean[]
}