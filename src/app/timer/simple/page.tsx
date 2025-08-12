'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

import { formatNumberToTime } from '@/utils/timer'
import Header from '@/components/commons/header'
// import { useReadSimpleTimerList } from '@/hooks/useTimerApi'
import StartIcon from '@/assets/icon_start.svg'
import PauseIcon from '@/assets/icon_pause.svg'

import CircularTimerDisplay from '../_components/circularTimer'
import styles from './simple.module.css'
import Typography from '@/components/ui/typography'

// 타이머 업데이트 주기(단위ms)
const SMOOTH_INTERVAL = 10

export default function Simple() {
  // const { data } = useReadSimpleTimerList()
  const [initialTime, setInitialTime] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const timerEndSound = useRef<HTMLAudioElement | null>(null)

  // 임시 데이터
  const data = {
    simpleTimerCount: 6,
    simpleTimers: [
      { simpleTimerId: 1, time: 2 },
      { simpleTimerId: 2, time: 5 },
      { simpleTimerId: 3, time: 10 },
      { simpleTimerId: 4, time: 30 },
      { simpleTimerId: 5, time: 60 },
      { simpleTimerId: 6, time: 59 * 60 + 59 },
    ],
  }

  const handleTimerFinish = useCallback(() => {
    if (timerEndSound.current) {
      timerEndSound.current.play().catch((error) => {
        console.error('오디오 재생 오류:', error)
      })
    }
  }, [])

  const handlePresetClick = (seconds: number) => {
    setInitialTime(seconds)
    setTimeLeft(seconds * 1000)
    setIsActive(true)
  }

  const handleToggleIconClick = () => {
    if (initialTime > 0) {
      setIsActive(!isActive)
    }
  }

  const progressBarValue =
    initialTime > 0 ? (timeLeft / (initialTime * 1000)) * 100 : 0

  useEffect(() => {
    timerEndSound.current = new Audio('/timerEnd.mp3')
  }, [])

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= SMOOTH_INTERVAL) {
            handleTimerFinish()
            setInitialTime(0)
            setIsActive(false)
            return 0
          }
          return prevTime - SMOOTH_INTERVAL
        })
      }, SMOOTH_INTERVAL)

      return () => clearInterval(interval)
    }
  }, [isActive])

  return (
    <div className={styles['page-container']}>
      <Header>심플 타이머</Header>

      <div className={styles['indicator-section']}>
        <div className={styles['indicator']}>
          <CircularTimerDisplay value={progressBarValue}>
            <div className={styles['inside-section']}>
              <div className={styles['timer-text']}>
                {formatNumberToTime(Math.ceil(timeLeft / 1000))}
              </div>
              <button onClick={handleToggleIconClick}>
                {isActive ? (
                  <PauseIcon className={styles['timer-icon']} />
                ) : (
                  <StartIcon className={styles['timer-icon']} />
                )}
              </button>
            </div>
          </CircularTimerDisplay>
        </div>
      </div>

      <div className={styles['timer-button-section']}>
        <div className={styles['timer-button-grid']}>
          {data.simpleTimers.map((preset) => (
            <button
              className={styles['timer-button']}
              key={preset.simpleTimerId}
              onClick={() => handlePresetClick(preset.time)}
            >
              <Typography as="span" variant="text22" weight="bold">
                {formatNumberToTime(preset.time)}
              </Typography>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
