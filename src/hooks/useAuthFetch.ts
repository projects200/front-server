import { useAuth } from 'react-oidc-context'

export function useAuthFetch() {
  const auth = useAuth()

  return async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    const user = auth.user

    if (!user || !user.access_token) {
      throw new Error('User not authenticated')
    }

    const authHeaders: HeadersInit = {
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${user.access_token}`,
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
    }

    return fetch(input, {
      ...init,
      headers: authHeaders,
    })
  }
}
