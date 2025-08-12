import {
  SimpleTimer,
  SimpleTimerList,
  CustomTimer,
  CustomTimerList,
} from '@/types/timer'
import {
  SimpleTimerDto,
  SimpleTimerListDto,
  CustomTimerDto,
  CustomTimerListDto,
} from '@/types/dto/timer'

export function adapterCustomTimer(dto: CustomTimerDto): CustomTimer {
  return {
    customTimerId: dto.customTimerId,
    customTimerName: dto.customTimerName,
  }
}

export function adapterCustomTimerList(
  dto: CustomTimerListDto,
): CustomTimerList {
  return {
    customTimerList: dto.customTimers.map(adapterCustomTimer),
  }
}

export function adapterSimpleTimer(dto: SimpleTimerDto): SimpleTimer {
  return {
    simpleTimerId: dto.simpleTimerId,
    time: dto.time,
  }
}

export function adapterSimpleTimerList(
  dto: SimpleTimerListDto,
): SimpleTimerList {
  return {
    count: dto.simpleTimerCount,
    simpleTimerList: dto.simpleTimers.map(adapterSimpleTimer),
  }
}
