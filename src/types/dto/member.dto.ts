type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN'

export type MemberSocreDto = {
  memberId: string
  memberScore: number
  policyMaxScore: number
  policyMinScore: number
}

export type MemberExerciseLocationDto = {
  exerciseLocationName: string
  latitude: number
  longitude: number
}

export type MemberProfileDto = {
  memberId: string
  profileThumbnailUrl: string
  profileImageUrl: string
  nickname: string
  gender: Gender
  birthDate: string
  locations: MemberExerciseLocationDto[]
}
