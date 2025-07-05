import { ScoreState } from '@/types/member'

export type ScoreAttributes = {
  color: string
  state: ScoreState
}

type GetScoreParams = {
  score: number
  maxScore: number
  isLoading: boolean
}

export const getScoreAttributes = ({
  score,
  maxScore,
  isLoading,
}: GetScoreParams): ScoreAttributes => {
  if (isLoading === true) {
    return {
      color: '#FFFFFF',
      state: 'loading',
    }
  }
  if (score <= maxScore / 3) {
    return { color: '#9E9E9E', state: 'low' }
  }
  if (score <= (maxScore * 2) / 3) {
    return { color: '#FD8027', state: 'middle' }
  }
  return {
    color: '#E53935',
    state: 'high',
  }
}
