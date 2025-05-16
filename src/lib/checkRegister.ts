import { authFetch } from '../lib/authFetch'

export async function checkRegister() {
  try {
    const res = await authFetch(
      'https://api.undabang.store/dev/v1/members/me/registration-status',
    )
    const json = await res.json()
    const isRegistered = json?.data?.isRegistered

    return isRegistered
  } catch {
    return null
  }
}
