import useSWR, { SWRConfiguration, Key } from 'swr'
import { useAuth } from 'react-oidc-context'

import { ApiError, ErrorPolicy } from '@/types/common'

import { useApiErrorHandler } from './useApiErrorHandler'

export interface UseApiGetOptions<Data>
  extends SWRConfiguration<Data, ApiError> {
  policy?: ErrorPolicy
  isAccessToken?: boolean
  shouldFetch?: boolean
}

export default function useApiGet<Data = unknown>(
  key: Key,
  request: (token: string) => Promise<Data>,
  options?: UseApiGetOptions<Data>,
) {
  const {
    policy,
    isAccessToken = true,
    shouldFetch = true,
    ...swrOptions
  } = options || {}
  const handleError = useApiErrorHandler()
  const { user } = useAuth()
  const token = isAccessToken ? user?.access_token : user?.id_token

  const fetcher = () => {
    if (!token) throw new ApiError('토큰이 만료되었습니다.', 401)
    return request(token)
  }

  const fetchKey = shouldFetch ? key : null

  return useSWR<Data, ApiError>(fetchKey, fetcher, {
    ...swrOptions,
    onError: (error) => handleError(error, policy),
  })
}
