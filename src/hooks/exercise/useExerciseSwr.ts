import useSWR, { SWRConfiguration, Key } from 'swr'
import { useAuth } from 'react-oidc-context'
import { ApiError } from '@/types/common'

export default function useExerciseSwr<Data = unknown>(
  key: Key, 
  request: (token: string) => Promise<Data>,
  options?: SWRConfiguration<Data, Error>,
) {
  const { user } = useAuth()
  const token = user?.access_token

  const fetcher = () => {
    if (!token) {
      throw new ApiError('accessToken이 만료되었거나 존재하지 않습니다.', 401)
    }
    return request(token)
  }

  return useSWR<Data, Error>(token ? key : null, fetcher, options)
}
