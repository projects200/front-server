export type ExercisePolicy = {
  minScore: number
  maxScore: number
  defaultScore: number
  scorePerRecord: number
  recordValidityPeriod: number
  recordMaxPerDay: number
  daysUntilPenalty: number
  penaltyScore: number
}
