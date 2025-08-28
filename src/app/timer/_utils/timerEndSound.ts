let simpleTimerEndAudio: HTMLAudioElement | null = null
let customTimerEndAudio: HTMLAudioElement | null = null
let customTimerBeforeAudio: HTMLAudioElement | null = null

if (typeof window !== 'undefined') {
  simpleTimerEndAudio = new Audio('/sound_simple_timer_end.mp3')
  customTimerEndAudio = new Audio('/sound_custom_timer_end.mp3')
  customTimerBeforeAudio = new Audio('/sound_custom_timer_before.mp3')
}

export const simpleTimerEndSound = () => {
  if (simpleTimerEndAudio) {
    simpleTimerEndAudio.play().catch(() => {})
  }
}
export const customTimerEndSound = () => {
  if (customTimerEndAudio) {
    customTimerEndAudio.play().catch(() => {})
  }
}
export const customTimerBeforeSound = () => {
  if (customTimerBeforeAudio) {
    customTimerBeforeAudio.play().catch(() => {})
  }
}
