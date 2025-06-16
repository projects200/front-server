'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  subMonths,
  addMonths,
  format,
  isSameMonth,
  isSameDay,
  isAfter,
} from 'date-fns'
import { ko } from 'date-fns/locale'
import clsx from 'clsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'

import { useReadExerciseRnage } from '@/hooks/useExerciseApi'
import LeftArrow from '@/assets/icon_left_arrow.svg'
import RightArrow from '@/assets/icon_right_arrow.svg'
import StampIcon from '@/assets/stamp.svg'
import SITE_MAP from '@/constants/siteMap.constant'

import styles from './exerciseCalendar.module.css'
import Typography from '@/components/ui/typography'

type CellMeta = {
  timeStamp: number
  day: number
  isCurrent: boolean
  isFuture: boolean
  isToday: boolean
  hasStamp: boolean
  fade?: boolean
}

const buildMonth = (
  base: Date,
  today: Date,
  countMap: Record<string, number>,
): CellMeta[][] => {
  const gridStart = startOfWeek(startOfMonth(base), { weekStartsOn: 0 })
  const gridEnd = endOfWeek(endOfMonth(base), { weekStartsOn: 0 })

  const weeks: CellMeta[][] = []
  let cursor = gridStart
  while (cursor <= gridEnd) {
    const row: CellMeta[] = []
    for (let i = 0; i < 7; i++) {
      const timeStamp = cursor.getTime()
      const key = format(cursor, 'yyyy-MM-dd')
      row.push({
        timeStamp,
        day: cursor.getDate(),
        isCurrent: isSameMonth(cursor, base),
        isFuture: isAfter(cursor, today),
        isToday: isSameDay(cursor, today),
        hasStamp: countMap[key] > 0,
      })
      cursor = addDays(cursor, 1)
    }
    weeks.push(row)
  }
  return weeks
}

const DayCell = React.memo(function DayCell({
  meta,
  onClick,
}: {
  meta: CellMeta
  onClick: () => void
}) {
  return (
    <div
      className={clsx(
        styles['cell'],
        !meta.isCurrent && styles['empty'],
        meta.isFuture && styles['disabled'],
        meta.isToday && styles['today'],
      )}
      onClick={onClick}
    >
      <Typography as="span" variant="text14">
        {meta.day}
      </Typography>
      {meta.hasStamp && (
        <StampIcon
          className={clsx(styles['stamp-icon'], meta.fade && styles['fade-in'])}
        />
      )}
    </div>
  )
})

export default function ExerciseCalendar() {
  const router = useRouter()
  const today = new Date()
  const [month, setMonth] = useState<Date>(startOfMonth(today))
  const swiperRef = useRef<SwiperType | null>(null)
  const dirRef = useRef<'prev' | 'next' | null>(null)
  const fadeInFlag = useRef<boolean | undefined>(false)

  const slidePrev = () => swiperRef.current?.slidePrev()
  const slideNext = () => {
    if (month >= startOfMonth(today)) return
    swiperRef.current?.slideNext()
  }
  const loadedSet = useRef<Set<string>>(new Set())

  const startDate: string = format(startOfMonth(month), 'yyyy-MM-dd')
  const endDate: string = isSameMonth(month, today)
    ? format(today, 'yyyy-MM-dd')
    : format(endOfMonth(month), 'yyyy-MM-dd')
  const { data } = useReadExerciseRnage(startDate, endDate)

  const counts = useMemo<Record<string, number>>(() => {
    const map: Record<string, number> = {}
    data?.forEach(({ date, record }) => (map[date] = record))
    return map
  }, [data])

  const monthKey = format(month, 'yyyy-MM')
  const needFadeIn = data && !loadedSet.current.has(monthKey)

  const prevGrid = useMemo(
    () => buildMonth(subMonths(month, 1), today, counts),
    [month, counts],
  )
  const thisGrid = useMemo(
    () => buildMonth(month, today, counts),
    [month, counts],
  )
  const nextGrid = useMemo(
    () => buildMonth(addMonths(month, 1), today, counts),
    [month, counts],
  )

  useEffect(() => {
    if (data) loadedSet.current.add(monthKey)
  }, [data, monthKey])

  useEffect(() => {
    fadeInFlag.current = needFadeIn
  }, [needFadeIn])

  useEffect(() => {
    if (!dirRef.current) return
    swiperRef.current?.slideTo(1, 0, false)
    dirRef.current = null
  }, [month])

  const renderGrid = (grid: CellMeta[][], isCenter: boolean) => (
    <div className={styles['month-wrapper']}>
      <div className={styles['weekdays']}>
        {['일', '월', '화', '수', '목', '금', '토'].map((weekday) => (
          <div key={weekday} className={styles['weekday']}>
            <Typography as="span" variant="text14" weight="bold">
              {weekday}
            </Typography>
          </div>
        ))}
      </div>
      {grid.map((week, wi) => (
        <div key={wi} className={styles.week}>
          {week.map((m) => {
            const fade = m.hasStamp && isCenter && fadeInFlag.current
            const meta: CellMeta = { ...m, fade } // 타입 만족
            return (
              <DayCell
                key={meta.timeStamp}
                meta={meta}
                onClick={() => {
                  if (!meta.isCurrent || meta.isFuture) return
                  router.push(
                    `${SITE_MAP.EXERCISE_LIST}?date=${format(
                      new Date(meta.timeStamp),
                      'yyyy-MM-dd',
                    )}`,
                  )
                }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <button onClick={slidePrev} className={styles['nav-button']}>
          <LeftArrow />
        </button>
        <Typography as="span" variant="text15" weight="bold">
          {format(month, 'yyyy년 M월', { locale: ko })}
        </Typography>
        <button
          onClick={slideNext}
          className={styles['nav-button']}
          disabled={month >= startOfMonth(today)}
        >
          <RightArrow />
        </button>
      </div>

      <Swiper
        onSwiper={(s) => (swiperRef.current = s)}
        initialSlide={1}
        slidesPerView={1}
        resistanceRatio={0.5}
        onSlidePrevTransitionEnd={() => {
          dirRef.current = 'prev'
          setMonth((month) => subMonths(month, 1))
        }}
        onSlideNextTransitionEnd={(swiper) => {
          if (month >= startOfMonth(today)) {
            swiper.slideTo(1, 0, false)
            return
          }
          dirRef.current = 'next'
          setMonth((month) => addMonths(month, 1))
        }}
        style={{ width: '100%' }}
      >
        <SwiperSlide>{renderGrid(prevGrid, false)}</SwiperSlide>
        <SwiperSlide>{renderGrid(thisGrid, true)}</SwiperSlide>
        <SwiperSlide>{renderGrid(nextGrid, false)}</SwiperSlide>
      </Swiper>
    </div>
  )
}
