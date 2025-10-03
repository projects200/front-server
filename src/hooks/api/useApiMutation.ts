import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation'
import { Key } from 'swr'
import { useAuth } from 'react-oidc-context'

import { ApiError, ErrorPolicy } from '@/types/common'

import { useApiErrorHandler } from './useApiErrorHandler'

type MutationResult<Data, Body> = {
  data: Data
  variables: Body
}

export interface UseApiMutationOptions<Data, Body>
  extends SWRMutationConfiguration<
    MutationResult<Data, Body>,
    ApiError,
    Key,
    Body
  > {
  policy?: ErrorPolicy
  isAccessToken?: boolean
  shouldFetch?: boolean
}

export default function useApiMutation<Data = unknown, Body = unknown>(
  key: Key,
  request: (token: string, body: Body) => Promise<Data>,
  options?: UseApiMutationOptions<Data, Body>,
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

  const fetcher = async (
    _key: Key,
    { arg }: { arg: Body },
  ): Promise<MutationResult<Data, Body>> => {
    if (!token) throw new ApiError('토큰이 만료되었습니다.', 401)
    const result = await request(token, arg)
    return { data: result, variables: arg }
  }

  const fetchKey = shouldFetch ? key : null

  return useSWRMutation<MutationResult<Data, Body>, ApiError, Key, Body>(
    fetchKey,
    fetcher,
    {
      ...swrOptions,
      onError: (error) => handleError(error, policy),
    },
  )
}
