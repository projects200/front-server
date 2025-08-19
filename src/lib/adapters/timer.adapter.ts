import {
  SimpleTimer,
  SimpleTimerList,
  CustomTimer,
  CustomTimerList,
  CustomTimerStep,
  CustomTimerDetail,
} from '@/types/timer'
import {
  SimpleTimerDto,
  SimpleTimerListDto,
  CustomTimerDto,
  CustomTimerListDto,
  CustomTimerStepDto,
  CustomTimerDetailDto,
} from '@/types/dto/timer.dto'

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
    customTimerCount: dto.customTimerCount,
    customTimerList: dto.customTimers.map(adapterCustomTimer),
  }
}

export function adapterCustomTimerStep(
  dto: CustomTimerStepDto,
): CustomTimerStep {
  return {
    customTimerStepsId: dto.customTimerStepsId,
    customTimerStepsName: dto.customTimerStepsName,
    customTimerStepsOrder: dto.customTimerStepsOrder,
    customTimerStepsTime: dto.customTimerStepsTime,
  }
}

export function adapterCustomTimerDetail(
  dto: CustomTimerDetailDto,
): CustomTimerDetail {
  return {
    customTimerId: dto.customTimerId,
    customTimerName: dto.customTimerName,
    customTimerStepCount: dto.customTimerStepCount,
    customTimerStepList: dto.customTimerSteps.map(adapterCustomTimerStep),
  }
}
