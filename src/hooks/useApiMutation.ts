import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation'
import { Key } from 'swr'
import { useAuth } from 'react-oidc-context'
import { ApiError } from '@/types/common'

export default function useApiMutation<Data = unknown, Body = unknown>(
  key: Key,
  request: (token: string, body: Body) => Promise<Data>,
  options?: SWRMutationConfiguration<Data, ApiError, Key, Body>,
) {
  const { user } = useAuth()
  const token = user?.access_token

  const fetcher = (_key: Key, { arg }: { arg: Body }) => {
    if (!token) throw new ApiError('토큰이 만료되었습니다.', 401)
    return request(token, arg)
  }

  return useSWRMutation<Data, ApiError, Key, Body>(key, fetcher, options)
}
