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
