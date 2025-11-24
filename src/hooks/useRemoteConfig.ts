import { useState, useEffect, useSyncExternalStore } from 'react'
import {
  getRemoteConfigSnapshot,
  getServerSnapshot,
  initializeRemoteConfig,
  subscribeToRemoteConfig,
} from '@/lib/firebase/remoteConfigStore'

// 여러 컴포넌트에서 초기화 함수가 중복 실행되는 것을 방지하기 위한 플래그
let isInitialized = false

export function useRemoteConfig() {
  const [isLoading, setIsLoading] = useState(true)

  const config = useSyncExternalStore(
    subscribeToRemoteConfig,
    getRemoteConfigSnapshot,
    getServerSnapshot,
  )

  useEffect(() => {
    if (isInitialized) {
      // 로딩 상태는 초기 스냅샷이 비어있는지 여부로 판단
      if (Object.keys(getRemoteConfigSnapshot()).length > 0) {
        setIsLoading(false)
      }
      return
    }

    isInitialized = true

    const init = async () => {
      await initializeRemoteConfig()
      setIsLoading(false)
    }

    init()
  }, [])

  return { config, isLoading }
}
