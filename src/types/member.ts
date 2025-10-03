export type ScoreState = 'loading' | 'low' | 'middle' | 'high'

export type MemberScore = {
  memberId: string
  memberScore: number
  maxScore: number
  minScore: number
}

export type MemberExerciseLocation = {
  exerciseLocationName: string
  latitude: number
  longitude: number
}

export type MemberProfile = {
  memberId: string
  profileThumbnailUrl: string
  profileImageUrl: string
  nickname: string
  gender: string
  birthDate: string
  locationList: MemberExerciseLocation[]
}

export type MemberLocationFlattened = {
  memberId: string
  profileThumbnailUrl: string | null
  profileImageUrl: string
  nickname: string
  gender: string
  birthDate: string
  location: MemberExerciseLocation
}
