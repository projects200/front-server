'use client'

import { useQueryState, parseAsInteger } from 'nuqs'
import { useState, useEffect, useRef, useCallback } from 'react'
import clsx from 'clsx'

import ClockIcon from '@/assets/icon_clock.svg'
import { formatNumberToTime } from '@/utils/timer'
import Header from '@/components/commons/header'
import KebabIcon from '@/assets/icon_kebab.svg'
import LoopOnIcon from '@/assets/icon_loop_on.svg'
import LoopOffIcon from '@/assets/icon_loop_off.svg'
import Button from '@/components/ui/button'
import Typography from '@/components/ui/typography'

// import { useReadCustomTimerDetail } from '@/hooks/useTimerApi'

import { useTimer } from '../_hooks/useTimer'
import CircularTimerDisplay from '../_components/circularTimer'
import {
  customTimerBeforeSound,
  customTimerEndSound,
} from '../_utils/timerEndSound'
import KebabModal from './_components/kebabModal'
import styles from './custom.module.css'

// 테스트 데이터
import { data } from '../testData'

export default function Custom() {
  const [customTimerId] = useQueryState('id', parseAsInteger)
  // API 개발완료되면 실제 데이터 교체
  // const { data } = useReadCustomTimerDetail(customTimerId)
  const [isBottomModalOpen, setIsBottomModalOpen] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isTimerStarted, setIsTimerStarted] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  // 매초 시간이 변경될 때 실행될 로직
  const handleSecondChange = useCallback((secondsLeft: number) => {
    if (secondsLeft <= 3 && secondsLeft >= 1) {
      customTimerBeforeSound()
    }
  }, [])

  const { timeLeft, isActive, isFinished, start, pause, resume, reset } =
    useTimer({
      onSecondChange: handleSecondChange,
    })

  // 종료 버튼 핸들러
  const handleStopButton = useCallback(() => {
    setIsTimerStarted(false)
    setCurrentStepIndex(0)
    if (data && data.customTimerStepCount > 0) {
      const firstStepTime = data.customTimerStepList[0].customTimerStepsTime
      reset(firstStepTime)
    }
  }, [data, reset])

  // 현재 스텝의 타이머가 종료되었을 때 실행될 로직
  const handleStepEnd = useCallback(() => {
    const nextStepIndex = currentStepIndex + 1

    // 다음 스텝 진행
    if (nextStepIndex < data.customTimerStepCount) {
      const nextStepTime =
        data.customTimerStepList[nextStepIndex].customTimerStepsTime

      setCurrentStepIndex(nextStepIndex)
      start(nextStepTime)
    }
    // 루프 활성화 시 첫 스텝으로
    else if (isLooping) {
      const firstStepTime = data.customTimerStepList[0].customTimerStepsTime

      setCurrentStepIndex(0)
      start(firstStepTime)
    }
    // 타이머 완전 종료
    else {
      handleStopButton()
    }
  }, [currentStepIndex, data, isLooping, start, handleStopButton])

  useEffect(() => {
    if (isFinished) {
      customTimerEndSound()
      handleStepEnd()
    }
  }, [isFinished, handleStepEnd])

  // 시작, 일시정지 버튼 클릭 핸들러
  const handleStartPauseButton = () => {
    if (!isTimerStarted) {
      setIsTimerStarted(true)
      const firstStepTime =
        data.customTimerStepList[currentStepIndex].customTimerStepsTime
      start(firstStepTime)
    } else {
      if (isActive) {
        pause()
      } else {
        resume()
      }
    }
  }

  // 데이터 로드 시 첫 스텝의 시간으로 타이머를 리셋
  const initialTime =
    data?.customTimerStepList[currentStepIndex]?.customTimerStepsTime || 0

  useEffect(() => {
    if (data && data.customTimerStepCount > 0) {
      const firstStepTime = data.customTimerStepList[0].customTimerStepsTime
      reset(firstStepTime)
    }
  }, [data, reset])

  // 스텝을 클릭했을 때 실행될 핸들러
  const handleStepClick = useCallback((index: number) => {
    setIsTimerStarted(true)
    setCurrentStepIndex(index)
    const stepTime = data.customTimerStepList[index].customTimerStepsTime
    start(stepTime)
  }, [])

  const progressBarValue =
    initialTime > 0 ? (timeLeft / (initialTime * 1000)) * 100 : 0

  // 현재 활성화된 스텝이 화면에 보이도록 자동 스크롤
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
        <button onClick={() => setIsLooping(!isLooping)}>
          {isLooping ? (
            <LoopOnIcon className={styles['loop-icon']} />
          ) : (
            <LoopOffIcon className={styles['loop-icon']} />
          )}
        </button>

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
            <button
              className={clsx(styles['step-item'], {
                [styles['active-step']]: index === currentStepIndex,
              })}
              onClick={() => handleStepClick(index)}
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
            </button>
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
