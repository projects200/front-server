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

// 날짜가 YYYY-MM-DD 형식이고, 실존하며, 오늘 이후가 아닌지 확인합니다.
export function isValidYYYYMMDD(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return false
  }

  const inputDate = new Date(date)

  if (Number.isNaN(inputDate.getTime())) {
    return false
  }

  if (inputDate.toISOString().slice(0, 10) !== date) {
    return false
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)

  if (inputDate >= tomorrow) {
    return false
  }

  return true
}

export function isValidExerciseId(exerciseId: unknown): exerciseId is number {
  return (
    typeof exerciseId === 'number' &&
    Number.isInteger(exerciseId) &&
    exerciseId >= 0
  )
}
