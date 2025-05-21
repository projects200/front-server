import { registerFetch } from '@/lib/authFetch'
import { Gender } from '@/types/profile'

export async function submitRegister(data: {
  nickname: string
  birthdate: string
  gender: Gender
}) {
  const response = await registerFetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${process.env.NEXT_PUBLIC_SIGN_UP}`,
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
