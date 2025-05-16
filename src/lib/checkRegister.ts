import { authFetch } from '../lib/authFetch'

export async function checkRegister() {
  try {
    // api의 cors정책에 빠진부분이 있는듯하여 해결시 수정될코드입니다.
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
