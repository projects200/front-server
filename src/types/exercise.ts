export type Picture = {
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

export interface ExerciseContent {
  title: string
  category?: string
  location?: string
  startedAt: string
  endedAt: string
  content?: string
}

export interface ExercisePicturesUpload {
  images: File[]
}

export interface ExercisePictures {
  images: Picture[]
}

export interface ExerciseRecordReq
  extends ExerciseContent,
    Partial<ExercisePicturesUpload> {}

export interface ExerciseRecordRes
  extends ExerciseContent,
    Partial<ExercisePictures> {}
