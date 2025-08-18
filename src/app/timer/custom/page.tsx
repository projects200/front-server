'use client'

import { useQueryState, parseAsInteger } from 'nuqs'
import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

import ClockIcon from '@/assets/icon_clock.svg'
import { formatNumberToTime } from '@/utils/timer'
import Header from '@/components/commons/header'
import KebabIcon from '@/assets/icon_kebab.svg'
import Button from '@/components/ui/button'
import Typography from '@/components/ui/typography'
// import { useReadCustomTimerDetail } from '@/hooks/useTimerApi'

import KebabModal from './_components/kebabModal'
import CircularTimerDisplay from '../_components/circularTimer'
import { timerEndSound } from '../_utils/timerEndSound'
import styles from './custom.module.css'

// 타이머 업데이트 주기(단위ms)
const SMOOTH_INTERVAL = 10

// 테스트 데이터
import { data } from './testData'

export default function Custom() {
  const [customTimerId] = useQueryState('id', parseAsInteger)
  // API 개발완료되면 실제 데이터 교체
  // const { data } = useReadCustomTimerDetail(customTimerId)
  const [isBottomModalOpen, setIsBottomModalOpen] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isTimerStarted, setIsTimerStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  const initialTime =
    data?.customTimerStepList[currentStepIndex]?.customTimerStepsTime || 0

  // data 로드후 타이머 초기화
  useEffect(() => {
    if (data && data.customTimerStepCount > 0) {
      const firstStepTime = data.customTimerStepList[0].customTimerStepsTime
      setTimeLeft(firstStepTime * 1000)
    }
  }, [data])

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timeoutIdRef.current = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - SMOOTH_INTERVAL)
      }, SMOOTH_INTERVAL)
    } else if (timeLeft <= 0 && isActive) {
      timerEndSound()

      // 다음 스탭이 있는지 확인 후 다음스탭으로 초기화
      const nextStepIndex = currentStepIndex + 1
      if (nextStepIndex < data.customTimerStepCount) {
        setCurrentStepIndex(nextStepIndex)
        const nextStepTime =
          data.customTimerStepList[nextStepIndex].customTimerStepsTime
        setTimeLeft(nextStepTime * 1000)
      } else {
        handleStopButton()
      }
    }

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
    }
  }, [isActive, timeLeft, currentStepIndex, data])

  const handleStartPauseButton = () => {
    if (!isTimerStarted) setIsTimerStarted(true)
    setIsActive(!isActive)
  }

  const handleStopButton = () => {
    setIsActive(false)
    setIsTimerStarted(false)
    setCurrentStepIndex(0)
    if (data && data.customTimerStepCount > 0) {
      setTimeLeft(data.customTimerStepList[0].customTimerStepsTime * 1000)
    }
  }

  const progressBarValue =
    initialTime > 0 ? (timeLeft / (initialTime * 1000)) * 100 : 0

  // 하이라이트 스탭 화면에 보이도록 자동 스크롤
  useEffect(() => {
    const activeStepWrapper = stepRefs.current[currentStepIndex]

    if (activeStepWrapper) {
      activeStepWrapper.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [currentStepIndex])

  if (!customTimerId || !data) return null

  return (
    <div className={styles['page-container']}>
      <Header
        rightIcon={<KebabIcon className={styles['header-icon']} />}
        onClick={() => setIsBottomModalOpen(true)}
      >
        {data.customTimerName}
      </Header>

      <div className={styles['indicator-section']}>
        <div className={styles['indicator']}>
          <CircularTimerDisplay value={progressBarValue}>
            <div className={styles['inside-section']}>
              <div className={styles['timer-text']}>
                {formatNumberToTime(Math.ceil(timeLeft / 1000))}
              </div>
            </div>
          </CircularTimerDisplay>
        </div>
      </div>

      <div className={styles['controls-section']}>
        <Button
          className={styles['control-button']}
          onClick={handleStopButton}
          disabled={!isTimerStarted}
          variant={'secondary'}
        >
          종료
        </Button>
        <Button
          className={styles['control-button']}
          onClick={handleStartPauseButton}
          variant={isActive ? 'warning' : 'primary'}
        >
          {isActive ? '일시정지' : '시작'}
        </Button>
      </div>

      <div className={styles['step-list-section']}>
        {data.customTimerStepList.map((step, index) => (
          <div
            className={styles['step-item-wrapper']}
            ref={(element) => {
              stepRefs.current[index] = element
            }}
            key={`step-${step.customTimerStepsId}`}
          >
            <div
              className={clsx(styles['step-item'], {
                [styles['active-step']]: index === currentStepIndex,
              })}
            >
              <div className={styles['step-info']}>
                <ClockIcon className={styles['clock-icon']} />
                <Typography as="span" variant="text15" weight="bold">
                  {step.customTimerStepsName}
                </Typography>
              </div>
              <Typography as="span" variant="text18" weight="bold">
                {formatNumberToTime(step.customTimerStepsTime)}
              </Typography>
            </div>
          </div>
        ))}
      </div>

      <KebabModal
        isOpen={isBottomModalOpen}
        onClose={() => setIsBottomModalOpen(false)}
        customTimerId={customTimerId}
      />
    </div>
  )
}
