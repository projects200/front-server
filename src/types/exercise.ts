export type ExerciseContent = {
  title: string
  category?: string
  location?: string
  startedAt: string
  endedAt: string
  content?: string
}

export type ExercisePicture = {
  pictureId: number
  pictureUrl: string
  pictureName: string
  pictureExtension: string
}

export type ExerciseList = {
  exerciseId: number
  title: string
  category?: string
  startedAt: string
  endedAt: string
  images: string[]
}

export type ExercisePicturesUpload = {
  images: File[]
}

export type ExercisePicturesDelete = {
  deletedIds: number[]
}

export type ExercisePictures = {
  images: ExercisePicture[]
}

export type ExerciseRecordReq = ExerciseContent &
  Partial<ExercisePicturesUpload & ExercisePicturesDelete>

export type ExerciseRecordRes = ExerciseContent &
  Partial<ExercisePictures>