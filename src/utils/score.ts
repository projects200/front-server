import { ScoreState } from '@/types/member'

export type ScoreAttributes = {
  color: string
  state: ScoreState
}

type GetScoreParams = {
  score: number
  maxScore: number
  minScore: number
  isLoading: boolean
}

const SCORE_HIGH_LEVEL = 0.7
const SCORE_MIDDLE_LEVEL = 0.33

export const getScoreAttributes = ({
  score,
  maxScore,
  minScore,
  isLoading,
}: GetScoreParams): ScoreAttributes => {
  const scoreRange = maxScore - minScore
  const highLevelScore = minScore + scoreRange * SCORE_HIGH_LEVEL
  const middleLevelScore = minScore + scoreRange * SCORE_MIDDLE_LEVEL

  if (isLoading === true) {
    return {
      color: '#FFFFFF',
      state: 'loading',
    }
  }
  if (score <= middleLevelScore) {
    return { color: '#9E9E9E', state: 'low' }
  }
  if (score <= highLevelScore) {
    return { color: '#FD8027', state: 'middle' }
  }
  return {
    color: '#E53935',
    state: 'high',
  }
}
