import { authFetch } from '@/lib/customFetch'
import { ApiResponse } from '@/types/common'

// 구간별 운동기록 조회
export async function temp1() {
  const response = await authFetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}`)
  const json: ApiResponse<{ isRegistered: boolean }> = await response.json()
  return json
}

// 날짜별 운동기록 조회
export async function temp2() {
  const response = await authFetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}`)
  const json: ApiResponse<{ isRegistered: boolean }> = await response.json()
  return json
}

// 운동기록 상세조회
export async function temp3() {
  const response = await authFetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}`)
  const json: ApiResponse<{ isRegistered: boolean }> = await response.json()
  return json
}

// 운동기록 필드 생성
export async function temp4() {
  const response = await authFetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}`)
  const json: ApiResponse<{ isRegistered: boolean }> = await response.json()
  return json
}

// 운동기록 필드 수정
export async function temp5() {
  const response = await authFetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}`)
  const json: ApiResponse<{ isRegistered: boolean }> = await response.json()
  return json
}

// 운동기록 필드 삭제
export async function temp6() {
  const response = await authFetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}`)
  const json: ApiResponse<{ isRegistered: boolean }> = await response.json()
  return json
}

// 운동기록 이미지 생성
export async function temp7() {
  const response = await authFetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}`)
  const json: ApiResponse<{ isRegistered: boolean }> = await response.json()
  return json
}

// 운동기록 이미지 삭제
export async function temp8() {
  const response = await authFetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}`)
  const json: ApiResponse<{ isRegistered: boolean }> = await response.json()
  return json
}
