import { ApiResponse, ApiError } from '@/types/common'

export async function fetchWrapper<T>(url: string, options?: RequestInit, token?: string): Promise<T> {
  const headers: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    Accept: 'application/json',
    ...(options?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options?.headers as Record<string, string>),
  }

  const res = await fetch(url, {
    ...options,
    headers,
  })

  let json: ApiResponse<T> | undefined
  try {
    json = await res.json()
  } catch {}

  if (!res.ok) {
    if (json && typeof json.message === 'string') {
      throw new ApiError(json.message, res.status, json)
    }
    throw new ApiError('네트워크 상태를 확인해주세요.', res.status)
  }
  if (json && !json.succeed) {
    throw new ApiError(json.message ?? '요청에 실패하였습니다.', res.status, json)
  }
  return (json as ApiResponse<T>).data
}
