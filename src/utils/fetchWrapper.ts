export async function fetchWrapper<T>(
  url: string,
  options?: RequestInit,
  token?: string,
): Promise<T> {
  let headers: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options?.headers as Record<string, string>) || {}),
  }

  const isFormData = options?.body instanceof FormData
  if (!isFormData && !headers['Content-Type']) {
    headers = {
      'Content-Type': 'application/json',
      ...headers,
    }
  }

  const res = await fetch(url, {
    ...options,
    headers,
  })

  if (!res.ok) {
    let errorMsg = 'API 요청 실패'
    try {
      const errorBody = await res.json()
      errorMsg = errorBody.message || errorMsg
    } catch {}
    throw new Error(errorMsg)
  }

  return res.json()
}
