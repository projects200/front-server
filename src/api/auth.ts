import { authFetch, registerFetch } from '@/lib/customFetch'
import { ApiResponse } from '@/types/common'
import { Gender, MemberInfo } from '@/types/auth'

type SignUpProps = {
  nickname: string
  birthdate: string
  gender: Gender
}

// 회원등록상태 조회
export async function registrationStatus(): Promise<boolean> {
  const response = await authFetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${process.env.NEXT_PUBLIC_REGISTRATION_STATUS}`,
  )
  const json: ApiResponse<{ isRegistered: boolean }> = await response.json()

  if (!json.succeed) {
    throw new Error(json.message || '등록 상태 확인 실패')
  }
  return json.data.isRegistered
}

// 회원등록
export async function signUp(data: SignUpProps) {
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
  const json: ApiResponse<MemberInfo> = await response.json()

  if (!json.succeed) {
    throw new Error(json.message || '회원가입에 실패했습니다.')
  }
  return json
}
