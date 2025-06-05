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
  images: string[]
}

export interface ExerciseRecordReq
  extends ExerciseContent,
    Partial<ExercisePicturesUpload> {}

export interface ExerciseRecordRes
  extends ExerciseContent,
    Partial<ExercisePictures> {}
