// 영문 성별을 한글 성별로 변환 함수
type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN'

const GENDER_MAP = {
  MALE: '남성',
  FEMALE: '여성',
  UNKNOWN: '공개안함',
}

export function formatGenderToKR(gender: Gender) {
  return GENDER_MAP[gender] || '공개안함'
}

// YYYY-MM-DD형식의 날짜를 YYYY년 M월 D일 형식으로 변환 함수
export function formatDateToKR(date: string) {
  const [year, month, day] = date.split('-')
  return `${year}년 ${Number(month)}월 ${Number(day)}일`
}

// ISO 형식의 날짜 문자열을 오전 hh:mm 형식으로 변환
export function formatChatTime(dateString: string): string {
  const date = new Date(dateString)

  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? '오후' : '오전'

  hours = hours % 12
  hours = hours ? hours : 12

  const formattedMinutes = String(minutes).padStart(2, '0')

  return `${ampm} ${hours}:${formattedMinutes}`
}
