export type SimpleTimerDto = {
  simpleTimerId: number
  time: number
}

export type SimpleTimerListDto = {
  simpleTimerCount: number
  simpleTimers: SimpleTimerDto[]
}

export type CustomTimerDto = {
  customTimerId: number
  customTimerName: string
}

export type CustomTimerListDto = {
  customTimerCount: number
  customTimers: CustomTimerDto[]
}

export type CustomTimerStepDto = {
  customTimerStepsId: number
  customTimerStepsName: string
  customTimerStepsOrder: number
  customTimerStepsTime: number
}

export type CustomTimerDetailDto = {
  customTimerId: number
  customTimerName: string
  customTimerStepCount: number
  customTimerSteps: CustomTimerStepDto[]
}
