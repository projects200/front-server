import useSWRInfinite, {
  SWRInfiniteConfiguration,
  SWRInfiniteKeyLoader,
} from 'swr/infinite'
import { useAuth } from 'react-oidc-context'

import { ApiError, ErrorPolicy } from '@/types/common'

import { useApiErrorHandler } from './useApiErrorHandler'

export interface UseApiGetInfiniteOptions<Data>
  extends SWRInfiniteConfiguration<Data, ApiError> {
  policy?: ErrorPolicy
  isAccessToken?: boolean
  shouldFetch?: boolean
}

export default function useApiGetInfinite<
  Data = unknown,
  Args extends unknown[] = unknown[],
>(
  getKey: (pageIndex: number, previousPageData: Data | null) => Args | null,
  request: (token: string, ...args: Args) => Promise<Data>,
  options?: UseApiGetInfiniteOptions<Data>,
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

  const fetcher = (keyArgs: Args) => {
    if (!token) throw new ApiError('토큰이 만료되었습니다.', 401)
    return request(token, ...keyArgs)
  }

  const finalGetKey: SWRInfiniteKeyLoader = (...args) => {
    if (!shouldFetch) return null
    return getKey(...args)
  }

  return useSWRInfinite<Data, ApiError>(finalGetKey, fetcher, {
    ...swrOptions,
    onError: (error) => handleError(error, policy),
  })
}
