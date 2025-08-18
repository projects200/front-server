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
