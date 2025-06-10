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
    return { valid: false, error: '닉네임 조건을 학인해주세요.' }
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

// 날짜가 YYYY-MM-DD 형식인지 확인
export function isValidYYYYMMDD(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false

  const time = Date.parse(date)
  if (Number.isNaN(time)) return false

  return new Date(time).toISOString().slice(0, 10) === date
}
