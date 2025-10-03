import useSWR, { SWRConfiguration, Key } from 'swr'

import { ApiError, ErrorPolicy } from '@/types/common'
import { useApiErrorHandler } from './useApiErrorHandler'

export interface UsePublicApiGetOptions<Data>
  extends SWRConfiguration<Data, ApiError> {
  policy?: ErrorPolicy
  shouldFetch?: boolean
}

export default function usePublicApiGet<Data = unknown>(
  key: Key,
  request: () => Promise<Data>,
  options?: UsePublicApiGetOptions<Data>,
) {
  const { policy, shouldFetch = true, ...swrOptions } = options || {}
  const handleError = useApiErrorHandler()
  const fetcher = request
  const fetchKey = shouldFetch ? key : null

  return useSWR<Data, ApiError>(fetchKey, fetcher, {
    ...swrOptions,
    onError: (error) => handleError(error, policy),
  })
}
