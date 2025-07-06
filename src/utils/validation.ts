import { parseISO, isValid, isAfter, startOfToday } from 'date-fns'

// 닉네임 30글자제한, 특수문자 불가 확인
export function validateNickname(nickname: string): {
  valid: boolean
  error?: string
} {
  if (nickname.length > 30) {
    return { valid: false, error: '닉네임의 글자수가 너무 많습니다.' }
  }
  const regex = /^[a-zA-Z0-9가-힣]+$/
  if (!regex.test(nickname)) {
    return { valid: false, error: '닉네임 조건을 확인해주세요.' }
  }
  return { valid: true }
}

// 생년월일이 오늘 이전인지 확인
export function validateBirthdate(birthdate: string): {
  valid: boolean
  error?: string
} {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const inputDate = new Date(birthdate)
  inputDate.setHours(0, 0, 0, 0)

  if (inputDate >= today) {
    return { valid: false, error: '생년월일은 오늘 이전 날짜여야 합니다.' }
  }

  return { valid: true }
}

// 성별이 M F U 인지 확인
export function validateGender(gender: 'M' | 'F' | 'U' | null): {
  valid: boolean
  error?: string
} {
  if (gender === null) {
    return { valid: false, error: '성별을 선택해 주세요.' }
  }

  const allowedGenders = ['M', 'F', 'U']
  if (!allowedGenders.includes(gender)) {
    return { valid: false, error: '올바르지 않은 성별 값입니다.' }
  }

  return { valid: true }
}

// 날짜가 YYYY-MM-DD 형식이고, 실존하는 날짜인지 확인합니다..
export function isValidDateString(dateString: string): boolean {
  if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return false
  }

  const date = parseISO(dateString)

  return isValid(date)
}

// 날짜가 미래형식인지 확인합니다.
export function isFutureDate(dateString: string): boolean {
  if (!dateString) return false

  if (!isValidDateString(dateString)) {
    return false
  }

  const date = parseISO(dateString)

  return isAfter(date, startOfToday())
}

// 유효한 운동 아이디 인지 확인합니다.
export function isValidExerciseId(exerciseId: unknown): exerciseId is number {
  return (
    typeof exerciseId === 'number' &&
    Number.isInteger(exerciseId) &&
    exerciseId >= 0
  )
}
