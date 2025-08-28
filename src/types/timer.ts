// 심플타이머
export type SimpleTimer = {
  simpleTimerId: number
  time: number
}

export type SimpleTimerList = {
  count: number
  simpleTimerList: SimpleTimer[]
}

// 커스텀 타이머
export type CustomTimerStepContents = {
  customTimerStepName: string
  customTimerStepOrder: number
  customTimerStepTime: number
}

export type CustomTimerForm = {
  customTimerName: string
  customTimerStepList: CustomTimerStepContents[]
}

export type CustomTimer = {
  customTimerId: number
  customTimerName: string
}

export type CustomTimerList = {
  customTimerCount: number
  customTimerList: CustomTimer[]
}

export type CustomTimerStepId = {
  customTimerStepId: number
}

export type CustomTimerStep = CustomTimerStepId & CustomTimerStepContents

export type CustomTimerDetail = {
  customTimerId: number
  customTimerName: string
  customTimerStepCount: number
  customTimerStepList: CustomTimerStep[]
}