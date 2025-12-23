'use client'

import clsx from 'clsx'
import { useState, useEffect, useCallback } from 'react'
import {
  format,
  setMinutes,
  setSeconds,
  addHours,
  subHours,
  isAfter,
  isBefore,
  parseISO,
} from 'date-fns'

import WarningIcon from '@/assets/icon_warning.svg'
import ClockIcon from '@/assets/icon_clock.svg'
import Typography from '@/components/ui/typography'
import ArrowIcon from '@/assets/icon_right_arrow.svg'
import ExerciseCalendar from '@/components/commons/exerciseCalendar/exerciseCalendar'
import { toLocalISOString } from '@/utils/dataFormatting'

import styles from './timeField.module.css'

type ActiveView = {
  field: 'start' | 'end'
  role: 'date' | 'time' | null
}

type Props = {
  startedAt: string
  endedAt: string
  onStartedAtChange: (value: string) => void
  onEndedAtChange: (value: string) => void
  label: string
  description?: string
}

export default function TimeField({
  startedAt,
  endedAt,
  onStartedAtChange,
  onEndedAtChange,
  label,
  description,
}: Props) {
  const [activeView, setActiveView] = useState<ActiveView>({
    field: 'start',
    role: null,
  })
  const [tempTime, setTempTime] = useState({ hour: '', minute: '' })

  const startDate = startedAt ? parseISO(startedAt) : new Date()
  const endDate = endedAt ? parseISO(endedAt) : new Date()

  // 초기화 로직
  useEffect(() => {
    if (!startedAt) {
      const now = new Date()
      const initialStart = setSeconds(setMinutes(now, 0), 0)
      onStartedAtChange(toLocalISOString(initialStart))
      onEndedAtChange(toLocalISOString(now))
    }
  }, [])

  // 상호 연동 보정 및 미래 제한 로직
  const handleUpdate = useCallback(
    (newStart: Date, newEnd: Date, trigger: 'start' | 'end') => {
      const now = new Date()
      let [finalStart, finalEnd] = [newStart, newEnd]

      if (trigger === 'start' && isAfter(finalStart, finalEnd)) {
        finalEnd = addHours(finalStart, 1)
      } else if (trigger === 'end' && isBefore(finalEnd, finalStart)) {
        finalStart = subHours(finalEnd, 1)
      }

      if (isAfter(finalEnd, now)) {
        finalEnd = now
        if (isBefore(finalEnd, finalStart)) finalStart = subHours(finalEnd, 1)
      }

      onStartedAtChange(toLocalISOString(finalStart))
      onEndedAtChange(toLocalISOString(finalEnd))
    },
    [onStartedAtChange, onEndedAtChange],
  )

  // 시간 입력 영역 클릭 시 (확장 UI 열기)
  const toggleView = (field: 'start' | 'end', role: 'date' | 'time') => {
    const isSame = activeView.field === field && activeView.role === role
    setActiveView(isSame ? { field, role: null } : { field, role })

    if (role === 'time' && !isSame) {
      const target = field === 'start' ? startDate : endDate
      setTempTime({ hour: format(target, 'HH'), minute: format(target, 'mm') })
    }
  }

  // 시간 확인 버튼 클릭
  const handleTimeConfirm = () => {
    const targetDate = activeView.field === 'start' ? startDate : endDate
    const newDate = new Date(targetDate)
    newDate.setHours(Number(tempTime.hour), Number(tempTime.minute), 0)

    if (activeView.field === 'start') {
      handleUpdate(newDate, endDate, 'start')
    } else {
      handleUpdate(startDate, newDate, 'end')
    }
    setActiveView({ ...activeView, role: null })
  }

  // 날짜 선택 시 기존 시간(시/분) 정보를 유지하며 업데이트
  const handleDateSelect = (selectedDate: Date) => {
    const isStart = activeView.field === 'start'
    const timeSource = isStart ? startDate : endDate
    const newDateTime = new Date(selectedDate)

    newDateTime.setHours(timeSource.getHours(), timeSource.getMinutes(), 0)

    if (isStart) {
      handleUpdate(newDateTime, endDate, 'start')
    } else {
      handleUpdate(startDate, newDateTime, 'end')
    }
  }

  return (
    <div className={styles['container']}>
      <Typography variant="content-large" weight="medium">
        {label}
      </Typography>

      {/* 운동 점수 획득 가능 여부 문구 */}
      {description && (
        <div className={styles['score-description']}>
          <WarningIcon className={styles['warning-icon']} />
          <Typography
            as="span"
            variant="content-small"
            className={styles['description']}
          >
            {description}
          </Typography>
        </div>
      )}

      {/* 시작시간, 종료시간 디스플레이 영역 */}
      <div className={styles['display']}>
        <div className={styles['time-container']}>
          <button
            type="button"
            className={clsx(
              styles['date-button'],
              activeView.field === 'start' &&
                activeView.role === 'date' &&
                styles.active,
            )}
            onClick={() => toggleView('start', 'date')}
          >
            <Typography as="p" variant="content-large">
              {format(startDate, 'yyyy.MM.dd')}
            </Typography>
          </button>
          <button
            type="button"
            className={clsx(
              styles['time-button'],
              activeView.field === 'start' &&
                activeView.role === 'time' &&
                styles.active,
            )}
            onClick={() => toggleView('start', 'time')}
          >
            <Typography as="p" variant="content-large">
              {format(startDate, 'HH:mm')}
            </Typography>
          </button>
        </div>

        <ArrowIcon className={styles['arrow']} />

        <div className={styles['time-container']}>
          <button
            type="button"
            className={clsx(
              styles['date-button'],
              activeView.field === 'end' &&
                activeView.role === 'date' &&
                styles.active,
            )}
            onClick={() => toggleView('end', 'date')}
          >
            <Typography as="p" variant="content-large">
              {format(endDate, 'yyyy.MM.dd')}
            </Typography>
          </button>
          <button
            type="button"
            className={clsx(
              styles['time-button'],
              activeView.field === 'end' &&
                activeView.role === 'time' &&
                styles.active,
            )}
            onClick={() => toggleView('end', 'time')}
          >
            <Typography as="p" variant="content-large">
              {format(endDate, 'HH:mm')}
            </Typography>
          </button>
        </div>
      </div>

      {/* 확장 UI 영역 */}
      {activeView.role === 'date' && (
        <div className={styles['expanded-container']}>
          <div className={styles['calendar-wrapper']}>
            <ExerciseCalendar
              selectedDate={
                activeView.field === 'start'
                  ? toLocalISOString(startDate)
                  : toLocalISOString(endDate)
              }
              onDateSelect={handleDateSelect}
              showStamps={false}
            />
          </div>
        </div>
      )}
      {activeView.role === 'time' && (
        <div className={styles['expanded-container']}>
          <div className={styles['time-picker-container']}>
            <ClockIcon className={styles['clock-icon']} />
            <input
              type="number"
              className={styles['input']}
              value={tempTime.hour}
              onChange={(e) =>
                setTempTime((p) => ({
                  ...p,
                  hour: e.target.value.slice(0, 2),
                }))
              }
              min="0"
              max="23"
            />
            <Typography as="span" variant="header" weight="bold">
              :
            </Typography>
            <input
              type="number"
              className={styles['input']}
              value={tempTime.minute}
              onChange={(e) =>
                setTempTime((p) => ({
                  ...p,
                  minute: e.target.value.slice(0, 2),
                }))
              }
              min="0"
              max="59"
            />
            <button
              type="button"
              className={styles['picker-confirm-buttom']}
              onClick={handleTimeConfirm}
            >
              <Typography as="span" variant="content-large" weight="bold">
                확인
              </Typography>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
