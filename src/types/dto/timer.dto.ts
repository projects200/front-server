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

export type CustomTimerStepIdDto = {
  customTimerStepsId: number
}

export type CustomTimerStepContentsDto = {
  customTimerStepsName: string
  customTimerStepsOrder: number
  customTimerStepsTime: number
}

export type CustomTimerStepDto = CustomTimerStepIdDto & CustomTimerStepContentsDto

export type CustomTimerDetailDto = {
  customTimerId: number
  customTimerName: string
  customTimerStepCount: number
  customTimerSteps: CustomTimerStepDto[]
}

export type CustomTimerFormDto = {
  customTimerName: string
  customTimerSteps: CustomTimerStepContentsDto[]
}