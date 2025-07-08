'use client'

// import { useReadExerciseScorePolicy } from '@/hooks/usePolicyApi'

export default function ExerciseScorePolicy() {
  // const {data, isLoading} = useReadExerciseScorePolicy()

  return (
    <div style={{ fontSize: '80%' }}>
      <h2>점수 범위</h2>
      <div>- 최소: 0점</div>
      <div>- 최대: 100점</div>
      <h2 style={{ marginTop: '10px' }}>점수 획득</h2>
      <div>- 회원가입 시 기본으로 35점이 부여됩니다.</div>
      <div>- 운동 기록 1회 당 3점을 획득할 수 있습니다. (일1회)</div>
      <div>
        - 현재 시간으로부터 2일 안에 기록해야 점수를 획득할 수 있습니다.
      </div>
      <h2 style={{ marginTop: '10px' }}>점수 차감</h2>
      <div>- 7일이상 운동 기록을 하지 않으면 7일마다 1점이 차감됩니다.</div>
    </div>
  )
}
