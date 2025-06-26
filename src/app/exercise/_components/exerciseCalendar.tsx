'use client'

import { useState, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  addMonths,
  format,
  isSameMonth,
} from 'date-fns'
import { ko } from 'date-fns/locale'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useReadExerciseRange } from '@/hooks/useExerciseApi'
import LeftArrow from '@/assets/icon_left_arrow.svg'
import RightArrow from '@/assets/icon_right_arrow.svg'
import Typography from '@/components/ui/typography'
import SITE_MAP from '@/constants/siteMap.constant'

import MonthView from './monthView'
import styles from './exerciseCalendar.module.css'

/**
 * MonthView에 데이터를 주입하는 래퍼 컴포넌트입니다.
 * 각 월별로 독립적인 데이터 fetching과 계산을 수행합니다.
 */
const MonthViewWithData = ({
  today,
  monthToShow,
  isActive,
}: {
  today: Date
  monthToShow: Date
  isActive: boolean
}) => {
  const router = useRouter()

  // 미래의 달은 API를 호출하지 않도록 제어합니다.
  const isFutureMonth = monthToShow.getTime() > startOfMonth(today).getTime()
  const isDisabled = isFutureMonth || !isActive
  const startDate = format(startOfMonth(monthToShow), 'yyyy-MM-dd')
  const endDate = isSameMonth(monthToShow, today)
    ? format(today, 'yyyy-MM-dd')
    : format(endOfMonth(monthToShow), 'yyyy-MM-dd')
  const { data } = useReadExerciseRange(startDate, endDate, isDisabled)

  // API 응답 데이터를 날짜별 기록 횟수 맵으로 변환합니다.
  // TODO: 향후 이 컴포넌트에 상태가 추가되면,
  // 아래 counts 계산 로직은 성능을 위해 useMemo로 감싸야 합니다.
  const counts: Record<string, number> = {}
  if (data) {
    data.forEach(({ date, record }) => {
      counts[date] = record
    })
  }

  const handleDateClick = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    router.push(`${SITE_MAP.EXERCISE_LIST}?date=${dateStr}`)
  }

  return (
    <div className={styles['month-view-wrapper']}>
      <MonthView
        key={monthToShow.toISOString()}
        month={monthToShow}
        today={today}
        counts={counts}
        onDateClick={handleDateClick}
      />
    </div>
  )
}

/**
 * 운동 기록을 보여주는 스와이프 가능한 달력 컴포넌트입니다.
 */
export default function ExerciseCalendar() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(today))
  const prevMonth = useMemo(() => subMonths(currentMonth, 1), [currentMonth])
  const nextMonth = useMemo(() => addMonths(currentMonth, 1), [currentMonth])

  const containerRef = useRef<HTMLDivElement>(null)
  const [{ x }, api] = useSpring(() => ({ x: 0 }))

  // 드래그 제스처를 처리하는 로직
  const bind = useDrag(
    ({ down, movement: [mx] }) => {
      if (down) {
        const isCurrentMonthView = isSameMonth(currentMonth, today)
        let newX = mx
        if (isCurrentMonthView && mx < 0) {
          newX = 0
        }
        api.start({ x: newX, immediate: true })
        return
      }
      const containerWidth = containerRef.current?.clientWidth || 0
      const threshold = containerWidth / 3

      if (Math.abs(mx) > threshold) {
        const newMonth = mx > 0 ? prevMonth : nextMonth
        const isMovingToFuture =
          newMonth.getTime() > startOfMonth(today).getTime()
        if (isMovingToFuture) {
          api.start({ x: 0 })
        } else {
          const direction = mx > 0 ? 1 : -1
          const targetX = direction * containerWidth

          api.start({
            x: targetX,
            config: { tension: 250, friction: 30 },
            onRest: () => {
              setCurrentMonth(newMonth)
            },
          })
        }
      } else {
        api.start({ x: 0 })
      }
    },
    {
      axis: 'x',
      filterTaps: true,
      preventScroll: true,
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
  }, [currentMonth, api])

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <button onClick={handlePrev} className={styles['nav-button']}>
          <LeftArrow />
        </button>
        <Typography as="span" variant="text15" weight="bold">
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
            <Typography as="span" variant="text14" weight="bold">
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
            transform: x.to((val) => `translateX(calc(-100% / 3 + ${val}px))`),
          }}
        >
          <MonthViewWithData
            today={today}
            monthToShow={prevMonth}
            isActive={isSameMonth(currentMonth, prevMonth)}
          />
          <MonthViewWithData
            today={today}
            monthToShow={currentMonth}
            isActive={true}
          />
          <MonthViewWithData
            today={today}
            monthToShow={nextMonth}
            isActive={isSameMonth(currentMonth, nextMonth)}
          />
        </animated.div>
      </div>
    </div>
  )
}
