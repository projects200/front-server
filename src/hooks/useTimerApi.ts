import { readCustomTimerList } from '@/api/timer'
import { adapterCustomTimerList } from '@/lib/adapters/timer.adapter'
import { CustomTimerList } from '@/types/timer'

import useApiGet from './useApiGet'

// 커스텀 타이머 리스트 조회
export const useReadCustomTimerList = () =>
  useApiGet<CustomTimerList>(
    ['timer/list'],
    (token) => readCustomTimerList(token).then(adapterCustomTimerList),
    {},
  )
