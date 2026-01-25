import { UserProfilePreferExercise } from './mypage'

type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN'

export type ScoreState = 'loading' | 'low' | 'middle' | 'high'

export type MemberScore = {
  memberId: string
  memberScore: number
  maxScore: number
  minScore: number
}

export type MemberExerciseLocation = {
  exerciseLocationId: number
  exerciseLocationName: string
  latitude: number
  longitude: number
}

export type MemberProfile = {
  memberId: string
  profileThumbnailUrl: string
  profileImageUrl: string
  nickname: string
  gender: Gender
  birthDate: string
  memberScore: number
  locationList: MemberExerciseLocation[]
  preferredExerciseList: UserProfilePreferExercise[]
}

export type MemberLocationFlattened = {
  memberId: string
  profileThumbnailUrl: string | null
  profileImageUrl: string
  nickname: string
  gender: Gender
  birthDate: string
  location: MemberExerciseLocation
  preferredExerciseList: UserProfilePreferExercise[]
}

export type MemberLocationParams = {
  leftTopLatitude: number
  leftTopLongitude: number
  rightBottomLatitude: number
  rightBottomLongitude: number
}
