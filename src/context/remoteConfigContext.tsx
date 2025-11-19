import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useSyncExternalStore,
} from 'react'
import {
  RemoteConfigValues,
  getRemoteConfigSnapshot,
  getServerSnapshot,
  initializeRemoteConfig,
  subscribeToRemoteConfig,
} from '@/lib/firebase/remoteConfigStore'

type RemoteConfigContextType = {
  config: RemoteConfigValues
  isLoading: boolean
}

const RemoteConfigContext = createContext<RemoteConfigContextType>({
  config: {},
  isLoading: true,
})

export const useRemoteConfig = () => useContext(RemoteConfigContext)

// Firebase Remote Config 값을 앱 전역에 제공하고, 실시간 업데이트를
// 감지하여 동기적으로 반영하는 Provider 컴포넌트입니다.
export const RemoteConfigProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)

  const config = useSyncExternalStore(
    subscribeToRemoteConfig,
    getRemoteConfigSnapshot,
    getServerSnapshot,
  )

  useEffect(() => {
    const init = async () => {
      await initializeRemoteConfig()
      setIsLoading(false)
    }

    init()
  }, [])

  return (
    <RemoteConfigContext.Provider value={{ config, isLoading }}>
      {children}
    </RemoteConfigContext.Provider>
  )
}
