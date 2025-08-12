import { SimpleTimerListDto, CustomTimerListDto } from '@/types/dto/timer'
import { fetchWrapper } from '@/utils/fetchWrapper'

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
