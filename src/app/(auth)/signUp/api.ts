import { registerFetch } from '@/lib/authFetch'

export async function submitRegister(data: {
  nickname: string
  birthdate: string
  gender: 'M' | 'F' | 'U'
}) {
  const response = await registerFetch(
    'https://api.undabang.store/dev/auth/sign-up/v1',
    {
      method: 'POST',
      body: JSON.stringify({
        memberNickname: data.nickname,
        memberBday: data.birthdate,
        memberGender: data.gender,
      }),
    },
  )

  return response.json()
}
