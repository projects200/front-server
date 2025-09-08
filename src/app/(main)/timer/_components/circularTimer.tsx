'use client'

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

type Props = {
  value: number
  children: React.ReactNode
}

export default function CircularTimerDisplay({ value, children }: Props) {
  return (
    <CircularProgressbarWithChildren
      value={value}
      strokeWidth={8}
      styles={buildStyles({
        pathColor: '#4F7942', // 진한 녹색
        trailColor: '#EBF1E5', // 연한 회색
        pathTransitionDuration: 0,
      })}
    >
      {children}
    </CircularProgressbarWithChildren>
  )
}
