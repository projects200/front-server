export interface ExerciseContent {
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

export interface ExerciseList {
  exerciseId: number
  title: string
  category?: string
  startedAt: string
  endedAt: string
  images: string[]
}

export interface ExercisePicturesUpload {
  newImages: File[]
}

export interface ExercisePicturesDelete {
  deletedIds: number[]
}

export interface ExercisePictures {
  images: ExercisePicture[]
}

export interface ExerciseRecordReq
  extends ExerciseContent,
    Partial<ExercisePicturesUpload & ExercisePicturesDelete> {}

export interface ExerciseRecordRes
  extends ExerciseContent,
    Partial<ExercisePictures> {}
