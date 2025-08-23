import { useState, useEffect, useRef, useCallback } from 'react'

const TIMER_INTERVAL = 10

type Props = {
  onEnd?: () => void
  onSecondChange?: (secondsLeft: number) => void
}

/**
 * 정확한 시간 기반의 타이머 로직을 제공하는 커스텀 훅
 * @param onEnd - 타이머 종료 시 실행할 콜백
 * @param onSecondChange - 타이머의 남은 시간(초)이 바뀔 때마다 호출될 콜백
 */
export const useTimer = ({ onEnd, onSecondChange }: Props) => {
  const [timeLeft, setTimeLeft] = useState(0)
  const [targetTime, setTargetTime] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastNotifiedSecondRef = useRef<number | null>(null)

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        const newTimeLeft = targetTime - Date.now()

        if (onSecondChange) {
          const currentSeconds = Math.ceil(newTimeLeft / 1000)
          if (
            currentSeconds > 0 &&
            currentSeconds !== lastNotifiedSecondRef.current
          ) {
            onSecondChange(currentSeconds)
            lastNotifiedSecondRef.current = currentSeconds
          }
        }

        if (newTimeLeft > 0) {
          setTimeLeft(newTimeLeft)
        } else {
          setTimeLeft(0)
          setIsActive(false)
          if (onEnd) {
            onEnd()
          }
        }
      }, TIMER_INTERVAL)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, targetTime, onEnd, onSecondChange])

  // 지정된 시간으로 타이머를 시작합니다.
  const start = useCallback((seconds: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    const newTargetTime = Date.now() + seconds * 1000
    lastNotifiedSecondRef.current = null
    setTargetTime(newTargetTime)
    setTimeLeft(seconds * 1000)
    setIsActive(true)
  }, [])

  //  타이머를 일시정지합니다.
  const pause = useCallback(() => {
    setIsActive(false)
  }, [])

  // 타이머를 재개합니다.
  const resume = useCallback(() => {
    if (timeLeft > 0) {
      setTargetTime(Date.now() + timeLeft)
      setIsActive(true)
    }
  }, [timeLeft])

  // 타이머를 종료하고 지정된 시간으로 리셋합니다.
  const reset = useCallback((seconds: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    lastNotifiedSecondRef.current = null
    setIsActive(false)
    setTargetTime(0)
    setTimeLeft(seconds > 0 ? seconds * 1000 : 0)
  }, [])

  return { timeLeft, isActive, start, pause, resume, reset }
}
