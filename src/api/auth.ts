import { SignUp, MemberInfo } from '@/types/auth'
import { fetchWrapper } from '@/utils/fetchWrapper'

// 유저 생성
export function createUser(token: string, data: SignUp): Promise<MemberInfo> {
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
export function readRegistered(
  token: string,
): Promise<{ isRegistered: boolean }> {
  return fetchWrapper<{ isRegistered: boolean }>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/v1/registration-status`,
    { method: 'GET' },
    token,
  )
}

// 닉네임 중복 검사
export function readCkeckNickname(
  nickname: string,
): Promise<{ available: boolean }> {
  return fetchWrapper<{ available: boolean }>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/open/v1/nicknames/check?nickname=${nickname}`,
    { method: 'GET' },
  )
}
