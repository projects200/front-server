'use client'

import { useMemo, useState } from 'react'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { startOfMonth, format } from 'date-fns'
import CountUp from 'react-countup'

import LegalDocModal from '@/components/commons/legalDocModal'
import InfoIcon from '@/assets/icon_info_slim.svg'
import { useReadExerciseRange } from '@/hooks/useExerciseApi'
import { useReadMemberScore } from '@/hooks/useMemberApi'
import { getScoreAttributes } from '@/utils/score'
import Typography from '@/components/ui/typography'

import { CharacterFace } from './characterFace'
import styles from './scoreBoard.module.css'

const startDate = format(startOfMonth(new Date()), 'yyyy-MM-dd')
const endDate = format(new Date(), 'yyyy-MM-dd')

const LEGAL_DOC_URLS = {
  SCORE_POLICY: 'https://www.undabang.store/legal/exercise-point-policy.html',
}

const ScoreBoard = () => {
  const [legalDocUrl, setLegalDocUrl] = useState('')
  const { data: scoreData, isLoading } = useReadMemberScore()
  const { data: fetchedData } = useReadExerciseRange(startDate, endDate, true)
  const monthRecordCount = useMemo(() => {
    return fetchedData?.reduce((total, data) => total + data.record, 0) || 0
  }, [fetchedData])

  const score = scoreData === undefined ? 0 : scoreData.memberScore
  const maxScore = scoreData?.maxScore ?? 100
  const minScore = scoreData?.minScore ?? 0
  const progressBarValue = 1 + (score * 94) / 100
  const { color, state } = getScoreAttributes({
    score,
    maxScore: maxScore,
    isLoading,
  })

  const handleLegalDocModal = (url: string) => {
    setLegalDocUrl(url)
  }

  return (
    <>
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

          <button
            className={styles['info-block']}
            onClick={() => handleLegalDocModal(LEGAL_DOC_URLS.SCORE_POLICY)}
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
              value={progressBarValue}
              strokeWidth={7}
              styles={buildStyles({
                pathColor: color,
                trailColor: 'none',
                pathTransitionDuration: 0.8,
              })}
              maxValue={maxScore}
              minValue={minScore}
            >
              <CharacterFace state={state} />
            </CircularProgressbarWithChildren>
          </div>
        </div>
      </div>

      {legalDocUrl && (
        <LegalDocModal
          src={legalDocUrl}
          onClose={() => {
            handleLegalDocModal('')
          }}
        />
      )}
    </>
  )
}
export default ScoreBoard
