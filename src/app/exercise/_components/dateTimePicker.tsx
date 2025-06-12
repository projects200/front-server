import { useState } from 'react'

import ClockIcon from '@/assets/icon_clock.svg'
import Typography from '@/components/ui/typography'

import ScrollPicker from '@/components/commons/scrollPicker'

import styles from './dateTimePicker.module.css'

type DateTimePickerProps = {
  startedAt: string
  endedAt: string
  onStartedAtChange?: (value: string) => void
  onEndedAtChange?: (value: string) => void
  label: string
  readonly?: boolean
}

type DateTime = {
  date: string
  hour: number
  minute: number
}

const getInitialDateTime = (value?: string) => {
  const date = value ? new Date(value) : new Date()
  const year = String(date.getFullYear()).slice(2)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = date.getHours()
  const minute = date.getMinutes()

  return {
    date: `${year}.${month}.${day}`,
    hour,
    minute,
  }
}

const formatDisplay = (dateTime: DateTime) => {
  const [year, month, day] = dateTime.date.split('.')
  const paddedHour = String(dateTime.hour).padStart(2, '0')
  const paddedMinute = String(dateTime.minute).padStart(2, '0')
  return `${year}.${month}.${day} ${paddedHour}:${paddedMinute}`
}

const formatStorage = (dateTime: DateTime) => {
  const [year, month, day] = dateTime.date.split('.')
  const fullYear = Number(`20${year}`)
  const monthIndex = Number(month) - 1
  const dayNumber = Number(day)
  const date = new Date(fullYear, monthIndex, dayNumber, dateTime.hour, dateTime.minute)
  const offsetMs = date.getTimezoneOffset() * 60000
  const localIso = new Date(date.getTime() - offsetMs).toISOString().slice(0, 19)
  return localIso
}

export default function DateTimePicker({
  startedAt,
  endedAt,
  onStartedAtChange,
  onEndedAtChange,
  label,
  readonly = false,
}: DateTimePickerProps) {
  const [isOpenStart, setIsOpenStart] = useState(false)
  const [isOpenEnd, setIsOpenEnd] = useState(false)
  const formatStartDate = getInitialDateTime(startedAt)
  const formatEndDate = getInitialDateTime(endedAt)

  const handleChangeStart = (picked: Record<string, string | number>) => {
    onStartedAtChange?.(formatStorage(picked as { date: string; hour: number; minute: number }))
  }

  const handleChangeEnd = (picked: Record<string, string | number>) => {
    onEndedAtChange?.(formatStorage(picked as { date: string; hour: number; minute: number }))
  }

  return (
    <div className={styles['container']}>
      <label>
        <Typography as="span" variant="text15" weight="medium">
          {label}
        </Typography>
      </label>
      <div className={styles['time-selector']}>
        <button
          className={styles['button']}
          type="button"
          onClick={() => {
            if (!readonly) {
              setIsOpenStart(true)
            }
          }}
        >
          {!startedAt && <ClockIcon className={styles['icon']} />}
          {startedAt ? (
            <Typography as="span" variant="text14">
              {formatDisplay(formatStartDate)}
            </Typography>
          ) : (
            <Typography as="span" variant="text14">
              시작 시간
            </Typography>
          )}
        </button>
        <div className={styles['dash']}></div>
        <button
          className={styles['button']}
          type="button"
          onClick={() => {
            if (!readonly) {
              setIsOpenEnd(true)
            }
          }}
        >
          {!endedAt && <ClockIcon className={styles['icon']} />}
          {endedAt ? (
            <Typography as="span" variant="text14">
              {formatDisplay(formatEndDate)}
            </Typography>
          ) : (
            <Typography as="span" variant="text14">
              끝 시간
            </Typography>
          )}
        </button>
      </div>

      {isOpenStart && (
        <ScrollPicker
          fields={['date', 'hour', 'minute']}
          value={formatStartDate}
          onChange={handleChangeStart}
          onClose={() => setIsOpenStart(false)}
        />
      )}
      {isOpenEnd && (
        <ScrollPicker
          fields={['date', 'hour', 'minute']}
          value={formatEndDate}
          onChange={handleChangeEnd}
          onClose={() => setIsOpenEnd(false)}
        />
      )}
    </div>
  )
}
