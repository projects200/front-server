export type ExercisePolicy = {
  minScore: number
  maxScore: number
  defaultScore: number
  scorePerRecord: number
  validRecordDays: number
  daysUntilPenalty: number
  penaltyScore: number
}
