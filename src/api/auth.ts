import { SignUp, MemberInfo } from '@/types/auth'
import { fetchWrapper } from '@/utils/fetchWrapper'

// 유저 생성
export function createUser(token: string, data: SignUp): Promise<MemberInfo> {
  console.log(data)
  return fetchWrapper<MemberInfo>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/v1/sign-up`,
    {
      method: 'POST',
      body: JSON.stringify({
        memberNickname: data.nickname,
        memberBday: data.birthdate,
        memberGender: data.gender,
      }),
    },
    token,
  )
}

// 유저 회원가입 여부 확인
export function readRegistered(token: string): Promise<{ isRegistered: boolean }> {
  return fetchWrapper<{ isRegistered: boolean }>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/v1/registration-status`,
    { method: 'GET' },
    token,
  )
}

