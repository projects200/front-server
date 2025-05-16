import { userManager } from './auth'

export async function authFetch(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  const user = await userManager.getUser()

  if (!user || !user.access_token) {
    throw new Error('User not authenticated')
  }

  const accessToken = user?.access_token
  const authHeaders: HeadersInit = {
    ...(init?.headers ?? {}),
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  }

  return fetch(input, {
    ...init,
    headers: authHeaders,
  })
}
