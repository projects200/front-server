import { ExerciseScore } from '@/types/score'
import { ExerciseScoreDto } from '@/types/dto/score.dto'

export function adapterExerciseScore(dto: ExerciseScoreDto): ExerciseScore {
  return {
    expectedScore: dto.pointsPerExercise,
    currentScore: dto.currentUserScore,
    maxScore: dto.maxScore,
    validPeriod: {
      startedAt: dto.validWindow.startDateTime,
      endedAt: dto.validWindow.endDateTime,
    },
    ValidDate: dto.earnableScoreDates,
  }
}
