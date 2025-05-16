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
  const userId = user?.profile?.sub
  console.log('accessToken', accessToken)
  console.log('userId', userId)
  const authHeaders: HeadersInit = {
    ...(init?.headers ?? {}),
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
    'X-USER-ID': userId ?? '',
  }

  return fetch(input, {
    ...init,
    headers: authHeaders,
  })
}
