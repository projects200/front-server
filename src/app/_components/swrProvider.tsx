'use client'

import { SWRConfig } from 'swr'
import { useApiErrorHandler } from '@/hooks/useApiErrorHandler'

export function SwrProvider({ children }: { children: React.ReactNode }) {
  const handleError = useApiErrorHandler()

  return (
    <SWRConfig
      value={{
        onError: (error) => {
          handleError(error)
        },
        errorRetryCount: 0,
      }}
    >
      {children}
    </SWRConfig>
  )
}
