import { ExercisePolicy } from '@/types/policy'
import { ExercisePolicyDto } from '@/types/dto/policy'

export function adaptExercisePolicy(dto: ExercisePolicyDto): ExercisePolicy {
  return {
    minScore: dto.minScore,
    maxScore: dto.maxScore,
    defaultScore: dto.defaultScore,
    scorePerRecord: dto.scorePerRecord,
    validRecordDays: dto.validRecordDays,
    daysUntilPenalty: dto.daysUntilPenalty,
    penaltyScore: dto.penaltyScore,
  }
}
