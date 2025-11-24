import { getAll, onConfigUpdate } from 'firebase/remote-config'
import { remoteConfig, fetchAndActivate } from '@/lib/firebase/config'

type ConfigValue = string | number | boolean

export type RemoteConfigValues = Record<string, ConfigValue>

const defaultConfig: RemoteConfigValues = {
  new_feautre_flag: false,
}

let snapshot: RemoteConfigValues = {}

export const getRemoteConfigSnapshot = (): RemoteConfigValues => {
  return snapshot
}

export const getServerSnapshot = (): RemoteConfigValues => {
  return defaultConfig
}

// 스냅샷을 최신 값으로 업데이트하는 헬퍼 함수입니다.
const updateRemoteConfigSnapshot = (): void => {
  const allConfig = getAll(remoteConfig)
  const configValues: RemoteConfigValues = {}

  Object.entries(allConfig).forEach(([key, value]) => {
    configValues[key] = value.asBoolean()
  })

  snapshot = configValues
}

// Remote Config를 초기화하고 첫 스냅샷을 생성하는 함수입니다.
export const initializeRemoteConfig = async (): Promise<void> => {
  try {
    remoteConfig.defaultConfig = defaultConfig
    await fetchAndActivate(remoteConfig)
    updateRemoteConfigSnapshot()
  } catch (error) {
    console.error('Remote Config 초기화 에러:', error)
    snapshot = remoteConfig.defaultConfig
  }
}

// 스토어의 변경을 감지하고 구독하는 함수입니다.
export const subscribeToRemoteConfig = (callback: () => void): (() => void) => {
  const unsubscribe = onConfigUpdate(remoteConfig, {
    next: async () => {
      try {
        await fetchAndActivate(remoteConfig)
        updateRemoteConfigSnapshot()
        callback()
      } catch (error) {
        console.error('Remote Config 실시간 업데이트 실패:', error)
      }
    },
    error: () => {},
    complete: () => {},
  })

  return unsubscribe
}
