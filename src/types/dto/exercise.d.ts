export type PictureDto = {
  pictureId: number
  pictureUrl: string
  pictureName: string
  pictureExtension: string
}

export type ExerciseListResDto = {
  exerciseId: number
  exerciseTitle: string
  exercisePersonalType: string
  exerciseStartedAt: string
  exerciseEndedAt: string
  pictureUrl: string[]
}

export type ExerciseContentReqDto = {
  exerciseTitle: string
  exercisePersonalType: string
  exerciseLocation: string
  exerciseDetail: string
  exerciseStartedAt: string
  exerciseEndedAt: string
}

export type ExerciseRecordResDto = {
  exerciseTitle: string
  exercisePersonalType: string
  exerciseLocation: string
  exerciseDetail: string
  exerciseStartedAt: string
  exerciseEndedAt: string
  pictureDataList: PictureDto[] | null
}
