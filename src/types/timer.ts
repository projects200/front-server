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
  customTimerStepsName: string
  customTimerStepsOrder: number
  customTimerStepsTime: number
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
  customTimerStepsId: number
}

export type CustomTimerStep = CustomTimerStepId & CustomTimerStepContents

export type CustomTimerDetail = {
  customTimerId: number
  customTimerName: string
  customTimerStepCount: number
  customTimerStepList: CustomTimerStep[]
}