import { CustomTimerForm } from '@/types/timer'
import {
  SimpleTimerListDto,
  CustomTimerListDto,
  CustomTimerDetailDto,
  CustomTimerFormDto,
} from '@/types/dto/timer.dto'
import { fetchWrapper } from '@/utils/fetchWrapper'
import { adapterCustomTimerFormToDto } from '@/lib/adapters/timer.adapter'

/* 심플 타이머 */
// 심플 타이머 생성
export function createSimpleTimer(
  token: string,
  time: number,
): Promise<{ simpleTimerId: number }> {
  return fetchWrapper<{ simpleTimerId: number }>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/simple-timers`,
    {
      method: 'POST',
      body: JSON.stringify({ time: time }),
    },
    token,
  )
}

//심플 타이머 리스트 조회
export function readSimpleTimerList(
  token: string,
): Promise<SimpleTimerListDto> {
  return fetchWrapper<SimpleTimerListDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/simple-timers`,
    {
      method: 'GET',
    },
    token,
  )
}

//심플 타이머 수정
export function updateSimpleTimer(
  token: string,
  time: number,
  simpleTimerId: number,
): Promise<null> {
  return fetchWrapper<null>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/simple-timers/${simpleTimerId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ time: time }),
    },
    token,
  )
}
// 심플 타이머 삭제
export function removeSimpleTimer(
  token: string,
  simpleTimerId: number,
): Promise<null> {
  return fetchWrapper<null>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/simple-timers/${simpleTimerId}`,
    {
      method: 'DELETE',
    },
    token,
  )
}

/* 커스텀 타이머 */
// 커스텀 타이머 생성
export function createCustomTimer(
  token: string,
  data: CustomTimerForm,
): Promise<{ customTimerId: number }> {
  const dto: CustomTimerFormDto = adapterCustomTimerFormToDto(data)
  return fetchWrapper<{ customTimerId: number }>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/custom-timers`,
    {
      method: 'POST',
      body: JSON.stringify(dto),
    },
    token,
  )
}

// 커스텀 타이머 리스트 조회
export function readCustomTimerList(
  token: string,
): Promise<CustomTimerListDto> {
  return fetchWrapper<CustomTimerListDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/custom-timers`,
    {
      method: 'GET',
    },
    token,
  )
}

// 커스텀 타이머 상세 조회
export function readCustomTimerDetail(
  token: string,
  customTimerId: number,
): Promise<CustomTimerDetailDto> {
  return fetchWrapper<CustomTimerDetailDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/custom-timers/${customTimerId}`,
    {
      method: 'GET',
    },
    token,
  )
}

// 커스텀 타이머 수정(백엔드 미개발)
export function updateCustomTimer(
  token: string,
  data: CustomTimerForm,
): Promise<{ customTimerId: number }> {
  //반환값이 id가 아닐수 있음 확인필요
  const dto: CustomTimerFormDto = adapterCustomTimerFormToDto(data)
  return fetchWrapper<{ customTimerId: number }>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/custom-timers`,
    {
      method: 'PUT',
      body: JSON.stringify(dto),
    },
    token,
  )
}
// 커스텀 타이머 제목 수정(백엔드 미개발)

// 커스텀 타이머 삭제
export function removeCustomTimer(
  token: string,
  customTimerId: number,
): Promise<null> {
  return fetchWrapper<null>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/custom-timers/${customTimerId}`,
    {
      method: 'DELETE',
    },
    token,
  )
}
