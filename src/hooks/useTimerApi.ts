import {
  readSimpleTimerList,
  updateSimpleTimer,
  createCustomTimer,
  readCustomTimerList,
  readCustomTimerDetail,
  updateCustomTimer,
  removeCustomTime,
} from '@/api/timer'
import {
  adapterSimpleTimerList,
  adapterCustomTimerList,
  adapterCustomTimerDetail,
} from '@/lib/adapters/timer.adapter'
import {
  SimpleTimer,
  SimpleTimerList,
  CustomTimerList,
  CustomTimerDetail,
  CustomTimerForm,
} from '@/types/timer'

import useApiGet from './useApiGet'
import useApiMutation from './useApiMutation'

/* 심플 타이머 */
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
    ['timer/simple/list'],
    (token, body) => updateSimpleTimer(token, body.time, body.simpleTimerId),
    {},
  )

/* 커스텀 타이머 */
// 커스텀 타이머 생성
export const usePostCustomTimer = () =>
  useApiMutation<{ customTimerId: number }, CustomTimerForm>(
    ['timer/custom/list'],
    createCustomTimer,
    {},
  )

// 커스텀 타이머 리스트 조회
export const useReadCustomTimerList = () =>
  useApiGet<CustomTimerList>(
    ['timer/custom/list'],
    (token) => readCustomTimerList(token).then(adapterCustomTimerList),
    {},
  )

// 커스텀 타이머 상세 조회
export const useReadCustomTimerDetail = (customTimerId: number) =>
  useApiGet<CustomTimerDetail>(
    ['timer/custom/detail', customTimerId],
    (token) =>
      readCustomTimerDetail(token, customTimerId).then(
        adapterCustomTimerDetail,
      ),
    {},
  )

// 커스텀 타이머 수정
export const usePutCustomTimer = (customTimerId: number) =>
  useApiMutation<{ customTimerId: number }, CustomTimerForm>(
    ['timer/custom/detail', customTimerId],
    updateCustomTimer,
    {},
  )

// 커스텀 타이머 삭제
export const useDeleteCustomTimer = (customTimerId: number) =>
  useApiMutation<null, null>(
    ['timer/custom/list'],
    (token) => removeCustomTime(token, customTimerId),
    {},
  )
