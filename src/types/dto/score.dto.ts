export type ValidWindow = {
  startDateTime: string
  endDateTime: string
}

export type ExerciseScoreDto = {
  pointsPerExercise: number
  currentUserScore: number
  maxScore: number
  validWindow: ValidWindow
  earnableScoreDates: string[]
}
