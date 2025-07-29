import { ExercisePolicy } from '@/types/policy'
import { ExercisePolicyDto } from '@/types/dto/policy'

export function adaptExercisePolicy(dto: ExercisePolicyDto): ExercisePolicy {
  const policyMap = dto.policies.reduce(
    (acc, policy) => {
      acc[policy.policyKey] = policy.policyValue
      return acc
    },
    {} as Record<string, string>,
  )
  return {
    maxScore: parseInt(policyMap['EXERCISE_SCORE_MAX_POINTS'] || '0', 10),
    minScore: parseInt(policyMap['EXERCISE_SCORE_MIN_POINTS'] || '0', 10),
    defaultScore: parseInt(policyMap['SIGNUP_INITIAL_POINTS'] || '0', 10),
    scorePerRecord: parseInt(policyMap['POINTS_PER_EXERCISE'] || '0', 10),
    recordValidityPeriod: parseInt(policyMap['EXERCISE_RECORD_VALIDITY_PERIOD'] || '0', 10),
    recordMaxPerDay: parseInt(policyMap['EXERCISE_RECORD_MAX_PER_DAY'] || '0', 10),
    daysUntilPenalty: parseInt(policyMap['PENALTY_INACTIVITY_THRESHOLD_DAYS'] || '0', 10),
    penaltyScore: parseInt(policyMap['PENALTY_SCORE_DECREMENT_POINTS'] || '0', 10),
  }
}
