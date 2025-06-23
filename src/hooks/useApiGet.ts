import useSWR, { SWRConfiguration, Key } from 'swr'
import { useAuth } from 'react-oidc-context'

import { ApiError, ErrorPolicy } from '@/types/common'
import { useApiErrorHandler } from './useApiErrorHandler'

export default function useApiGet<Data = unknown>(
  key: Key,
  request: (token: string) => Promise<Data>,
  options?: SWRConfiguration<Data, ApiError>,
  policy?: ErrorPolicy,
  isAccessToken = true,
) {
  const handleError = useApiErrorHandler()
  const { user } = useAuth()
  const token = isAccessToken ? user?.access_token : user?.id_token

  const fetcher = () => {
    if (!token) throw new ApiError('토큰이 만료되었습니다.', 401)
    return request(token)
  }

  return useSWR<Data, ApiError>(key, fetcher, {
    ...options,
    onError: (error) => handleError(error, policy),
  })
}
