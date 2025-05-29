import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useRegisterFetch } from '@/hooks/useRegisterFetch'
import { ApiResponse } from '@/types/common'
import { Gender, MemberInfo } from '@/types/auth'

type SignUpProps = {
  nickname: string
  birthdate: string
  gender: Gender
}

export function useAuthApi() {
  const authFetch = useAuthFetch()
  const registerFetch = useRegisterFetch()

  // 회원등록상태 조회
  const registrationStatus = async (): Promise<boolean> => {
    const response = await authFetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}${process.env.NEXT_PUBLIC_REGISTRATION_STATUS}`,
    )
    const json: ApiResponse<{ isRegistered: boolean }> = await response.json()
    console.log(response)
    if (!json.succeed) {
      throw new Error(json.message || '등록 상태 확인 실패')
    }
    return json.data.isRegistered
  }

  // 회원등록
  const signUp = async (data: SignUpProps) => {
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

  return {
    registrationStatus,
    signUp,
  }
}
