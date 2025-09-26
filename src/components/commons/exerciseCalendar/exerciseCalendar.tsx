'use client'

import { useState, useMemo, useRef, forwardRef } from 'react'
import { startOfMonth, subMonths, addMonths, format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import LeftArrow from '@/assets/icon_left_arrow.svg'
import RightArrow from '@/assets/icon_right_arrow.svg'
import Typography from '@/components/ui/typography'

import MonthViewWithData from './monthViewWithData'
import styles from './exerciseCalendar.module.css'

type Props = {
  onDateSelect?: (date: Date) => void
  selectedDate: string
  isReadOnly?: boolean
}

const ExerciseCalendar = forwardRef<HTMLDivElement, Props>(
  ({ onDateSelect, selectedDate, isReadOnly = false }, ref) => {
    const today = new Date()
    const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(today))
    const prevMonth = useMemo(() => subMonths(currentMonth, 1), [currentMonth])
    const nextMonth = useMemo(() => addMonths(currentMonth, 1), [currentMonth])
    const containerRef = useRef<HTMLDivElement>(null)
    const [{ x }, api] = useSpring(() => ({ x: 0 }))

    const bind = useDrag(
      ({ down, movement: [mx] }) => {
        if (down) {
          api.start({ x: mx, immediate: true })
          return
        }

        const containerWidth = containerRef.current?.clientWidth || 0
        const threshold = containerWidth / 4

        if (Math.abs(mx) <= threshold) {
          api.start({ x: 0 })
          return
        }

        const newMonth = mx > 0 ? prevMonth : nextMonth
        const isMovingToFuture =
          newMonth.getTime() > startOfMonth(today).getTime()
        if (isMovingToFuture) {
          api.start({ x: 0 })
          return
        }

        const direction = mx > 0 ? 1 : -1
        const targetX = direction * containerWidth

        api.start({
          x: targetX,
          config: { tension: 250, friction: 30 },
          onRest: () => {
            setCurrentMonth(newMonth)
          },
        })
      },
      {
        axis: 'x',
        filterTaps: true,
      },
    )
    const handlePrev = () => setCurrentMonth(subMonths(currentMonth, 1))
    const handleNext = () => {
      if (currentMonth.getTime() >= startOfMonth(today).getTime()) return
      setCurrentMonth(addMonths(currentMonth, 1))
    }

    // 애니메이션이 종료되면서 currentMonth 상태가 변경되면, x축을 즉각적으로 맞춰줍니다.
    useMemo(() => {
      api.start({ x: 0, immediate: true })
    }, [currentMonth])

    return (
      <div className={styles['container']} ref={ref}>
        <div className={styles['header']}>
          <button onClick={handlePrev} className={styles['nav-button']}>
            <LeftArrow />
          </button>
          <Typography as="span" variant="content-large" weight="bold">
            {format(currentMonth, 'yyyy년 M월', { locale: ko })}
          </Typography>
          <button
            onClick={handleNext}
            className={styles['nav-button']}
            disabled={currentMonth.getTime() >= startOfMonth(today).getTime()}
          >
            <RightArrow />
          </button>
        </div>

        <div className={styles['weekdays']}>
          {['일', '월', '화', '수', '목', '금', '토'].map((weekday) => (
            <div key={weekday} className={styles['weekday']}>
              <Typography as="span" variant="content-medium" weight="bold">
                {weekday}
              </Typography>
            </div>
          ))}
        </div>

        <div
          className={styles['calendar-carousel-container']}
          ref={containerRef}
          {...bind()}
        >
          <animated.div
            className={styles['calendar-carousel-view']}
            style={{
              transform: x.to(
                (val) => `translateX(calc(-100% / 3 + ${val}px))`,
              ),
            }}
          >
            <MonthViewWithData
              today={today}
              monthToShow={prevMonth}
              isActive={false}
              onDateSelect={onDateSelect}
              selectedDate={selectedDate}
              isReadOnly={isReadOnly}
            />
            <MonthViewWithData
              today={today}
              monthToShow={currentMonth}
              isActive={true}
              onDateSelect={onDateSelect}
              selectedDate={selectedDate}
              isReadOnly={isReadOnly}
            />
            <MonthViewWithData
              today={today}
              monthToShow={nextMonth}
              isActive={false}
              onDateSelect={onDateSelect}
              selectedDate={selectedDate}
              isReadOnly={isReadOnly}
            />
          </animated.div>
        </div>
      </div>
    )
  },
)
ExerciseCalendar.displayName = 'ExerciseCalendar'
export default ExerciseCalendar
