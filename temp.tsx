const getWeeks = (month: Date): Date[][] => {
  const gridStart = startOfWeek(startOfMonth(month), { weekStartsOn: 0 })
  const gridEnd = endOfWeek(endOfMonth(month), { weekStartsOn: 0 })
  const weeks: Date[][] = []
  let cursor = gridStart
  while (cursor <= gridEnd) {
    const days: Date[] = []
    for (let i = 0; i < 7; i++) {
      days.push(cursor)
      cursor = addDays(cursor, 1)
    }
    weeks.push(days)
  }
  return weeks
}

const renderMonth = (weeks: Date[][], refMonth: Date, isCenter: boolean) => (
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
    {weeks.map((week, wi) => (
      <div key={wi} className={styles.week}>
        {week.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd')
          const isCurrent = isSameMonth(day, refMonth)
          const isFuture = isAfter(day, today)
          const isToday = isSameDay(day, today)
          const count = counts[dateStr] ?? 0
          return (
            <div
              key={dateStr}
              className={clsx(
                styles['cell'],
                !isCurrent && styles['empty'],
                isFuture && styles['disabled'],
                isToday && styles['today'],
              )}
              onClick={() => {
                if (!isCurrent || isFuture) return
                router.push(`${SITE_MAP.EXERCISE_LIST}?date=${dateStr}`)
              }}
            >
              <Typography as="span" variant="text14">
                {format(day, 'd')}
              </Typography>
              {count > 0 && (
                <StampIcon
                  className={clsx(
                    styles['stamp-icon'],
                    isCenter && needFadeIn && styles['fade-in'],
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    ))}
  </div>
)
