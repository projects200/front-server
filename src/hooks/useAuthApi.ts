import { useCallback } from 'react'
import { useAuth } from 'react-oidc-context'

import { readRegistered, createUser } from '@/api/auth'
import { SignUp } from '@/types/auth'
import { apiHandler } from '@/utils/apiHandler'

export function useAuthApi() {
  const auth = useAuth()
  const user = auth.user
  const idToken = user?.id_token
  const accessToken = user?.access_token

  // 회원가입 여부 확인
  const checkRegistered = useCallback(() => {
    if (!accessToken) throw new Error('accessToken 만료')

    return apiHandler(async () => {
      const res = await readRegistered(accessToken)
      if (!res.succeed) throw new Error(res.message)

      return res.data
    })
  }, [accessToken])

  // 회원가입
  const postCreateUser = useCallback(
    (data: SignUp) => {
      if (!idToken) throw new Error('idToken 만료')

      return apiHandler(async () => {
        const res = await createUser(idToken, data)
        if (!res.succeed) throw new Error(res.message)
          
        return res.data
      })
    },
    [idToken],
  )

  return { checkRegistered, postCreateUser }
}
