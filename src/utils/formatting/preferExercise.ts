const SKILL_LEVEL_MAP: { [key: string]: string } = {
  BEGINNER: '입문',
  ROOKIE: '초급',
  INTERMEDIATE: '중급',
  ADVANCED: '고급',
  SKILLED: '숙련',
  PRO: '선출',
}

export const formatSkillLevelToKo = (skillLevel: string): string => {
  return SKILL_LEVEL_MAP[skillLevel] || skillLevel
}

const DAY_NAMES = ['월', '화', '수', '목', '금', '토', '일']

export const formatDaysOfWeek = (daysOfWeek: boolean[]): string => {
  // 월,화,수,목,금,토,일 모두 선택한경우
  const isSelectedEveryDay = daysOfWeek.every((day) => day)

  if (isSelectedEveryDay) return '매일'

  const isAllWeekdaysSelected = daysOfWeek.slice(0, 5).every((day) => day)
  const isAllWeekendSelected = daysOfWeek.slice(5, 7).every((day) => day)
  const result = []

  // 평일 조건 처리
  if (isAllWeekdaysSelected) {
    result.push('평일')
  } else {
    daysOfWeek.slice(0, 5).forEach((isSelected, index) => {
      if (isSelected) {
        result.push(DAY_NAMES[index])
      }
    })
  }

  // 주말 조건 처리
  if (isAllWeekendSelected) {
    result.push('주말')
  } else {
    daysOfWeek.slice(5, 7).forEach((isSelected, index) => {
      if (isSelected) {
        result.push(DAY_NAMES[index + 5])
      }
    })
  }

  return result.join(', ')
}
