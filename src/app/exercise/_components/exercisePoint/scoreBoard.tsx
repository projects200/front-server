'use client'

import { useMemo } from 'react'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { startOfMonth, format } from 'date-fns'
import CountUp from 'react-countup'

import InfoIcon from '@/assets/icon_info_slim.svg'
import { useReadExerciseRange } from '@/hooks/useExerciseApi'
import { useReadMemberScore } from '@/hooks/useMemberApi'
import { getScoreAttributes } from '@/utils/score'
import Typography from '@/components/ui/typography'

import { CharacterFace } from './characterFace'
import styles from './scoreBoard.module.css'

const startDate = format(startOfMonth(new Date()), 'yyyy-MM-dd')
const endDate = format(new Date(), 'yyyy-MM-dd')

const ScoreBoard = () => {
  const { data: scoreData, isLoading } = useReadMemberScore()
  const { data: fetchedData } = useReadExerciseRange(startDate, endDate, true)
  const monthRecordCount = useMemo(() => {
    return fetchedData?.reduce((total, data) => total + data.record, 0) || 0
  }, [fetchedData])

  // 현재 백엔드 api가 수정중이라 memberScore시작점수가 0이고 maxScore가 없어 임의 값(기본60점, 최대100)으로 대체하였습니다.
  const TEMP_SCORE = 60
  const TEMP_MAXSCORE = 100
  const score = scoreData === undefined ? 0 : scoreData.memberScore + TEMP_SCORE
  const { color, state } = getScoreAttributes({
    score,
    maxScore: TEMP_MAXSCORE,
    isLoading,
  })

  return (
    <div className={styles['container']}>
      <div className={styles['info-section']}>
        <div className={styles['info-block']}>
          <Typography
            className={styles['count']}
            as="span"
            variant="text15"
            weight="bold"
          >
            <CountUp end={monthRecordCount} duration={1.5} suffix="회" />
          </Typography>
          <Typography
            className={styles['count-name']}
            as="span"
            variant="text14"
          >
            이번달 운동 횟수
          </Typography>
        </div>
        {/* 점수정책 모달창 표시 */}
        <button
          className={styles['info-block']}
          onClick={() => console.log('점수정책 모달창 표시')}
        >
          <Typography
            className={styles['count']}
            as="span"
            variant="text15"
            weight="bold"
          >
            <CountUp end={score} duration={1.5} suffix="점" />
          </Typography>
          <div className={styles['text-icon']}>
            <Typography
              className={styles['count-name']}
              as="span"
              variant="text14"
            >
              운동 점수
            </Typography>
            <InfoIcon className={styles['info-icon']} />
          </div>
        </button>
      </div>

      <div className={styles['indicator-section']}>
        <div className={styles['indicator']}>
          <CircularProgressbarWithChildren
            value={score * 0.95}
            strokeWidth={7}
            styles={buildStyles({
              pathColor: color,
              trailColor: 'none',
              pathTransitionDuration: 0.8,
            })}
          >
            <CharacterFace state={state} />
          </CircularProgressbarWithChildren>
        </div>
      </div>
    </div>

    // <div className={styles['indicator']}>
    //   <CircularProgressbarWithChildren
    //     value={score * 0.95}
    //     strokeWidth={7}
    //     styles={buildStyles({
    //       pathColor: color,
    //       trailColor: 'none',
    //       pathTransitionDuration: 0.8,
    //     })}
    //   >
    //     <CharacterFace state={state} />
    //   </CircularProgressbarWithChildren>
    // </div>
  )
}
export default ScoreBoard
