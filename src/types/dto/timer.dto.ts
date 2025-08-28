// 심플타이머
export type SimpleTimerDto = {
  simpleTimerId: number
  time: number
}

export type SimpleTimerListDto = {
  simpleTimerCount: number
  simpleTimers: SimpleTimerDto[]
}

// 커스텀 타이머
export type CustomTimerStepContentsDto = {
  customTimerStepName: string
  customTimerStepOrder: number
  customTimerStepTime: number
}

export type CustomTimerFormDto = {
  customTimerName: string
  customTimerSteps: CustomTimerStepContentsDto[]
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
  customTimerStepId: number
}

export type CustomTimerStepDto = CustomTimerStepIdDto &
  CustomTimerStepContentsDto

export type CustomTimerDetailDto = {
  customTimerId: number
  customTimerName: string
  customTimerStepCount: number
  customTimerSteps: CustomTimerStepDto[]
}
