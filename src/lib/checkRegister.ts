import { authFetch } from '../lib/authFetch'

export async function checkRegister() {
  try {
    const response = await authFetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}${process.env.NEXT_PUBLIC_REGISTRATION_STATUS}`,
    )
    const json = await response.json()
    const isRegistered = json?.data?.isRegistered

    return isRegistered
  } catch {
    return null
  }
}
