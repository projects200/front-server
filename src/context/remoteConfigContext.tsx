import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { getAll, onConfigUpdate, RemoteConfig } from 'firebase/remote-config'

import { remoteConfig, fetchAndActivate } from '@/lib/firebase/config'

type configType = string | number | boolean

type RemoteConfigContextType = {
  config: Record<string, configType> | null
  isLoading: boolean
}

const RemoteConfigContext = createContext<RemoteConfigContextType>({
  config: null,
  isLoading: true,
})

export const useRemoteConfig = () => useContext(RemoteConfigContext)

// Firebase Remote Config 값을 앱 전역에 제공하고 실시간
// 업데이트를 감지하여 즉시 반영하는 Provider 입니다
export const RemoteConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<Record<string, configType> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Firebase Remote Config 값을 저장하는 헬퍼 함수입니다.
  const setConfigValues = (remoteConfigInstance: RemoteConfig) => {
    const allConfig = getAll(remoteConfigInstance)
    const configValues: Record<string, configType> = {}

    Object.entries(allConfig).forEach(([key, value]) => {
      configValues[key] = value.asBoolean()
    })
    setConfig(configValues)
  }

  useEffect(() => {
    // 앱이 처음 시작될 때 Remote Config 값을 가져오는 초기화 함수입니다.
    const initRemoteConfig = async () => {
      try {
        remoteConfig.defaultConfig = {
          new_feautre_flag: false,
        }
        await fetchAndActivate(remoteConfig)
        setConfigValues(remoteConfig)
      } catch (error) {
        console.error('Remote Config 패치 에러:', error)
        setConfig(remoteConfig.defaultConfig)
      } finally {
        setIsLoading(false)
      }
    }

    initRemoteConfig()

    // Firebase 콘솔에서 설정값이 변경되면 이를 실시간으로 감지하는 리스터입니다.
    const unsubscribe = onConfigUpdate(remoteConfig, {
      next: async () => {
        try {
          await fetchAndActivate(remoteConfig)
          setConfigValues(remoteConfig)
        } catch (error) {
          console.error('Remote Config 실시간 업데이트 실패:', error)
        }
      },
      error: (error) => {
        console.error('Remote Config 리스너 에러:', error)
      },
      complete: () => {},
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <RemoteConfigContext.Provider value={{ config, isLoading }}>
      {children}
    </RemoteConfigContext.Provider>
  )
}
