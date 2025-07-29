'use client'

import { useReadExerciseScorePolicy } from '@/hooks/usePolicyApi'

export default function ExerciseScorePolicy() {
  const { data } = useReadExerciseScorePolicy()

  if (!data) return null

  return (
    <div style={{ fontSize: '80%' }}>
      <h2>점수 범위</h2>
      <div>- 최소: {data.minScore}점</div>
      <div>- 최대: {data.maxScore}점</div>
      <h2 style={{ marginTop: '10px' }}>점수 획득</h2>
      <div>- 회원가입 시 기본으로 {data.defaultScore}점이 부여됩니다.</div>
      <div>
        - 운동 기록 1회 당 {data.scorePerRecord}점을 획득할 수 있습니다. (일
        {data.recordMaxPerDay}회)
      </div>
      <div>
        - 현재 시간으로부터 {data.recordValidityPeriod}일 안에 기록해야 점수를
        획득할 수 있습니다.
      </div>
      <h2 style={{ marginTop: '10px' }}>점수 차감</h2>
      <div>
        - {data.daysUntilPenalty}일이상 운동 기록을 하지 않으면{' '}
        {data.daysUntilPenalty}일마다 {data.penaltyScore}점이 차감됩니다.
      </div>
    </div>
  )
}
