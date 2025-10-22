'use client'

import { useState, useEffect } from 'react'

import { formatNumberToTime } from '@/utils/timer'
import Header from '@/components/commons/header'
import {
  usePostSimpleTimer,
  useReadSimpleTimerList,
} from '@/hooks/api/useTimerApi'
import StartIcon from '@/assets/icon_start.svg'
import PauseIcon from '@/assets/icon_pause.svg'
import PlusIcon from '@/assets/icon_plus.svg'
import SortIcon from '@/assets/icon_sort.svg'
import Typography from '@/components/ui/typography'
import { useToast } from '@/hooks/useToast'
import { SimpleTimer } from '@/types/timer'

import { useTimer } from '../_hooks/useTimer'
import CircularTimerDisplay from '../_components/circularTimer'
import TimePicker from '../_components/timePicker'
import { simpleTimerEndSound } from '../_utils/timerEndSound'
import PresetCard from './_components/presetCard'
import styles from './simple.module.css'

const requestNotificationPermission = async () => {
  // 브라우저가 알림을 지원하는지 확인
  if (!('Notification' in window)) {
    alert('이 브라우저는 데스크톱 알림을 지원하지 않습니다.')
    return
  }

  // 현재 권한 상태 확인
  if (Notification.permission === 'granted') {
    alert('알림 권한이 이미 허용되었습니다.')
    return
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      alert('알림 권한이 허용되었습니다.')
    }
  }
}

const postMessageToSw = (message: { action: string; payload?: unknown }) => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message)
  }
}

export default function Simple() {
  const showToast = useToast()
  const { data } = useReadSimpleTimerList()
  const { trigger: timerCreate } = usePostSimpleTimer()
  const [initialTime, setInitialTime] = useState(0)
  const [displayedTimers, setDisplayedTimers] = useState<SimpleTimer[]>([])
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const {
    timeLeft,
    isActive,
    isFinished,
    targetTime,
    start,
    pause,
    resume,
    reset,
    syncState,
  } = useTimer({})

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  useEffect(() => {
    if (isFinished) {
      simpleTimerEndSound()
    }
  }, [isFinished])

  // 하이브리드 제어권 전환을 위한 로직
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isActive) {
          postMessageToSw({
            action: 'TAKE_OVER_TIMER',
            payload: { targetTime },
          })
          pause()
        }
      } else {
        postMessageToSw({ action: 'STOP_BACKGROUND_TIMER' })
        if (targetTime > 0) {
          const newTimeLeft = targetTime - Date.now()
          syncState(newTimeLeft)
        }
      }
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'TIMER_FINISHED') {
        if (document.hidden) {
          // simpleTimerEndSound()
          reset(0)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
      navigator.serviceWorker.addEventListener('message', handleMessage)
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleMessage)
      }
    }
  }, [isActive, targetTime])

  useEffect(() => {
    if (data) setDisplayedTimers(data.simpleTimerList)
  }, [data])

  const handleSortToggle = () => {
    const sorted = [...displayedTimers].sort((a, b) => {
      if (sortOrder === 'asc') return a.time - b.time
      return b.time - a.time
    })
    setDisplayedTimers(sorted)
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))
  }

  const handleComplete = async (time: number) => {
    if (time === 0) {
      showToast('0초는 선택할 수 없습니다.', 'info')
      return
    }
    try {
      const res = await timerCreate({ time: time })
      const newTimer: SimpleTimer = {
        time,
        simpleTimerId: res.data.simpleTimerId,
      }
      setDisplayedTimers((currentTimers) => [...currentTimers, newTimer])
    } catch {}
  }

  const handleUpdate = (updatedTimer: SimpleTimer) => {
    setDisplayedTimers((currentTimers) =>
      currentTimers.map((timer) =>
        timer.simpleTimerId === updatedTimer.simpleTimerId
          ? updatedTimer
          : timer,
      ),
    )
  }

  const handleDelete = (deletedTimerId: number) => {
    setDisplayedTimers((currentTimers) =>
      currentTimers.filter((timer) => timer.simpleTimerId !== deletedTimerId),
    )
  }

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
    <div className={styles['container']}>
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

      <button className={styles['sort-button']} onClick={handleSortToggle}>
        <Typography as="span" variant="content-large" weight="bold">
          정렬
        </Typography>
        <SortIcon className={styles['sort-icon']} />
      </button>

      <div className={styles['timer-preset-section']}>
        <div className={styles['timer-preset-grid']}>
          {displayedTimers.map((preset) => (
            <PresetCard
              key={preset.simpleTimerId}
              preset={preset}
              onPresetClick={handlePresetClick}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
          {displayedTimers && displayedTimers.length < 6 && (
            <button
              className={styles['add-preset-button']}
              onClick={() => setIsTimePickerOpen(true)}
            >
              <PlusIcon className={styles['plus-icon']} />
            </button>
          )}
        </div>

        {isTimePickerOpen && (
          <TimePicker
            time={0}
            onClose={() => setIsTimePickerOpen(false)}
            onComplete={handleComplete}
          />
        )}
      </div>
    </div>
  )
}
