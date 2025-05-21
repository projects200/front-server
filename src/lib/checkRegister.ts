import { authFetch } from '../lib/authFetch'

export async function checkRegister() {
  try {
    const response = await authFetch(
      'https://api.undabang.store/dev/v1/members/me/registration-status',
    )
    const json = await response.json()
    const isRegistered = json?.data?.isRegistered

    return isRegistered
  } catch {
    return null
  }
}
