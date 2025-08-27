'use client'

import { useState, useEffect } from 'react'

import { formatNumberToTime } from '@/utils/timer'
import Header from '@/components/commons/header'
import { useReadSimpleTimerList } from '@/hooks/useTimerApi'
import StartIcon from '@/assets/icon_start.svg'
import PauseIcon from '@/assets/icon_pause.svg'

import { useTimer } from '../_hooks/useTimer'
import CircularTimerDisplay from '../_components/circularTimer'
import { simpleTimerEndSound } from '../_utils/timerEndSound'
import PresetCard from './_components/presetCard'
import styles from './simple.module.css'

export default function Simple() {
  const { data } = useReadSimpleTimerList()
  const [initialTime, setInitialTime] = useState(0)

  const { timeLeft, isActive, isFinished, start, pause, resume } = useTimer({})

  useEffect(() => {
    if (isFinished) {
      simpleTimerEndSound()
    }
  }, [isFinished])
  
  const handlePresetClick = (seconds: number) => {
    setInitialTime(seconds)
    start(seconds)
  }

  const handleToggleIconClick = () => {
    if (initialTime <= 0) return
    if (isActive) {
      pause()
    } else {
      resume()
    }
  }

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
              <PresetCard
                key={preset.simpleTimerId}
                preset={preset}
                onPresetClick={handlePresetClick}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
