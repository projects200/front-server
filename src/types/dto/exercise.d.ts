export interface ExerciseListResDto {
  exerciseId: number
  exerciseTitle: string
  exercisePersonalType: string
  exerciseStartedAt: string
  exerciseEndedAt: string
  pictureUrl: string[]
}

export interface ExerciseContentReqDto {
  exerciseTitle: string
  exercisePersonalType: string
  exerciseLocation: string
  exerciseDetail: string
  exerciseStartedAt: string
  exerciseEndedAt: string
}

export interface ExerciseRecordResDto {
  exerciseTitle: string
  exercisePersonalType: string
  exerciseLocation: string
  exerciseDetail: string
  exerciseStartedAt: string
  exerciseEndedAt: string
  pictureDataList: string[] | null
}
