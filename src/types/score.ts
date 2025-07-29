export type ValidPeriod = {
  startedAt: string
  endedAt: string
}

export type ExerciseScore = {
  expectedScore: number
  currentScore: number
  maxScore: number
  validPeriod: ValidPeriod
  ValidDate: string[]
}
  