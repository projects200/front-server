export type ScoreState = 'loading' | 'low' | 'middle' | 'high'

export type MemberScore = {
  memberId: string
  memberScore: number
  maxScore: number
  minScore: number
}
