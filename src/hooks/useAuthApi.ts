import { useCallback } from 'react'
import { useAuth } from 'react-oidc-context'

import { readRegistered, createUser } from '@/api/auth'
import { SignUp } from '@/types/auth'
import { ApiError } from '@/types/common'

export function useAuthApi() {
  const auth = useAuth()
  const user = auth.user
  const idToken = user?.id_token
  const accessToken = user?.access_token

  // 회원가입 여부 확인
  const checkRegistered = useCallback(async () => {
    if (!accessToken) {
      throw new ApiError('accessToken이 만료되었거나 존재하지 않습니다.', 401)
    }
    const res = await readRegistered(accessToken)

    return res
  }, [accessToken])

  // 회원가입
  const postCreateUser = useCallback(
    async (data: SignUp) => {
      if (!idToken) {
        throw new ApiError('idToken이 만료되었거나 존재하지 않습니다.', 401)
      }
      const res = await createUser(idToken, data)

      return res
    },
    [idToken],
  )

  return { checkRegistered, postCreateUser }
}
