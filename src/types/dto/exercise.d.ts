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
