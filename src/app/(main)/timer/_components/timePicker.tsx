'use client'

import ScrollPicker from '@/components/commons/scrollPicker'

type Time = {
  minute: number
  second: number
}

type Props = {
  time: number
  onClose: () => void
  onComplete: (newTotalSeconds: number) => void
}

const secondsToTime = (secs: number): Time => {
  const minutes = Math.floor(secs / 60)
  const seconds = secs % 60
  return { minute: minutes, second: seconds }
}

export default function TimePicker({ time, onClose, onComplete }: Props) {
  const initialPickerValue = {
    minute1: secondsToTime(time).minute,
    second: secondsToTime(time).second,
  }

  const handleTimeChange = (pickedTime: Record<string, string | number>) => {
    const minuteFromPicker = pickedTime.minute1 as number
    const secondFromPicker = pickedTime.second as number
    const newTotalSeconds = minuteFromPicker * 60 + secondFromPicker

    onComplete(newTotalSeconds)
  }

  return (
    <ScrollPicker
      fields={['minute1', 'second']}
      value={initialPickerValue}
      onChange={handleTimeChange}
      onClose={onClose}
    />
  )
}
