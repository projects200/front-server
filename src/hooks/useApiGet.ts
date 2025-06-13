import useSWR, { SWRConfiguration, Key } from 'swr'
import { useAuth } from 'react-oidc-context'
import { ApiError } from '@/types/common'

export default function useApiGet<Data = unknown>(
  key: Key,
  request: (token: string) => Promise<Data>,
  options?: SWRConfiguration<Data, ApiError>,
) {
  const { user } = useAuth()
  const token = user?.access_token

  const fetcher = () => {
    if (!token) throw new ApiError('토큰이 만료되었습니다.', 401)
    return request(token)
  }

  return useSWR<Data, ApiError>(key, fetcher, options)
}
