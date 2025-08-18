'use client'

import { useState, useEffect, useRef } from 'react'
// import { mutate } from 'swr'

import { formatNumberToTime } from '@/utils/timer'
import Header from '@/components/commons/header'
import {
  useReadSimpleTimerList,
  // usePatchSimpleTimer,
} from '@/hooks/useTimerApi'
import StartIcon from '@/assets/icon_start.svg'
import PauseIcon from '@/assets/icon_pause.svg'
import Typography from '@/components/ui/typography'

import CircularTimerDisplay from '../_components/circularTimer'
import { timerEndSound } from '../_utils/timerEndSound'
import styles from './simple.module.css'

// 타이머 업데이트 주기(단위ms)
const SMOOTH_INTERVAL = 10

export default function Simple() {
  const { data } = useReadSimpleTimerList()
  // const { trigger: timerUpdate } = usePatchSimpleTimer()
  const [initialTime, setInitialTime] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

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

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timeoutIdRef.current = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - SMOOTH_INTERVAL)
      }, SMOOTH_INTERVAL)
    } else if (timeLeft <= 0 && isActive) {
      timerEndSound()
      setIsActive(false)
    }
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
    }
  }, [isActive, timeLeft])

  const progressBarValue =
    initialTime > 0 ? (timeLeft / (initialTime * 1000)) * 100 : 0

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
          {data &&
            data.simpleTimerList.map((preset) => (
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
