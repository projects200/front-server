import {
  readSimpleTimerList,
  updateSimpleTimer,
  readCustomTimerList,
} from '@/api/timer'
import {
  adapterSimpleTimerList,
  adapterCustomTimerList,
} from '@/lib/adapters/timer.adapter'
import { SimpleTimer, SimpleTimerList, CustomTimerList } from '@/types/timer'

import useApiGet from './useApiGet'
import useApiMutation from './useApiMutation'

// 심플 타이머 조회
export const useReadSimpleTimerList = () =>
  useApiGet<SimpleTimerList>(
    ['timer/simple/list'],
    (token) => readSimpleTimerList(token).then(adapterSimpleTimerList),
    {},
  )

// 심플 타이머 수정
export const usePatchSimpleTimer = () =>
  useApiMutation<null, SimpleTimer>(
    ['timer/simple/update'],
    (token, body) => updateSimpleTimer(token, body.time, body.simpleTimerId),
    {},
  )

// 커스텀 타이머 리스트 조회
export const useReadCustomTimerList = () =>
  useApiGet<CustomTimerList>(
    ['timer/custom/list'],
    (token) => readCustomTimerList(token).then(adapterCustomTimerList),
    {},
  )
