export type SimpleTimer = {
  simpleTimerId: number
  time: number
}

export type SimpleTimerList = {
  count: number
  simpleTimerList: SimpleTimer[]
}

export type CustomTimer = {
  customTimerId: number
  customTimerName: string
}

export type CustomTimerList = {
  customTimerCount: number
  customTimerList: CustomTimer[]
}

export type CustomTimerStep = {
  customTimerStepsId: number
  customTimerStepsName: string
  customTimerStepsOrder: number
  customTimerStepsTime: number
}

export type CustomTimerDetail = {
  customTimerId: number
  customTimerName: string
  customTimerStepCount: number
  customTimerStepList: CustomTimerStep[]
}
