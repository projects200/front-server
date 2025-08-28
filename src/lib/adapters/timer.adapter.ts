import {
  SimpleTimer,
  SimpleTimerList,
  CustomTimer,
  CustomTimerList,
  CustomTimerStep,
  CustomTimerStepContents,
  CustomTimerDetail,
  CustomTimerForm,
} from '@/types/timer'
import {
  SimpleTimerDto,
  SimpleTimerListDto,
  CustomTimerDto,
  CustomTimerListDto,
  CustomTimerStepDto,
  CustomTimerStepContentsDto,
  CustomTimerDetailDto,
  CustomTimerFormDto,
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
    customTimerStepId: dto.customTimerStepId,
    customTimerStepName: dto.customTimerStepName,
    customTimerStepOrder: dto.customTimerStepOrder,
    customTimerStepTime: dto.customTimerStepTime,
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

export function adapterCustomTimerStepContentsToDto(
  contents: CustomTimerStepContents,
): CustomTimerStepContentsDto {
  return {
    customTimerStepName: contents.customTimerStepName,
    customTimerStepOrder: contents.customTimerStepOrder,
    customTimerStepTime: contents.customTimerStepTime,
  }
}

export function adapterCustomTimerFormToDto(
  form: CustomTimerForm,
): CustomTimerFormDto {
  return {
    customTimerName: form.customTimerName,
    customTimerSteps: form.customTimerStepList.map(
      adapterCustomTimerStepContentsToDto,
    ),
  }
}
