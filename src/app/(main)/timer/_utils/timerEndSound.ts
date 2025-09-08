import { getAssetUrl } from '@/lib/getAssetUrl'

let simpleTimerEndAudio: HTMLAudioElement | null = null
let customTimerEndAudio: HTMLAudioElement | null = null

if (typeof window !== 'undefined') {
  simpleTimerEndAudio = new Audio(getAssetUrl('/sound_simple_timer_end.mp3'))
  customTimerEndAudio = new Audio(getAssetUrl('/sound_custom_timer_end.mp3'))
}

export const simpleTimerEndSound = () => {
  if (simpleTimerEndAudio) {
    simpleTimerEndAudio.play().catch(() => {
      console.log()
    })
  }
}
export const playCustomTimerEndSound = () => {
  if (customTimerEndAudio) {
    customTimerEndAudio.currentTime = 0
    customTimerEndAudio.play().catch(() => {})
  }
}

export const pauseCustomTimerEndSound = () => {
  if (customTimerEndAudio) {
    customTimerEndAudio.pause()
  }
}

export const resumeCustomTimerEndSound = () => {
  if (customTimerEndAudio) {
    customTimerEndAudio.play().catch(() => {
      console.log()
    })
  }
}

export const stopCustomTimerEndSound = () => {
  if (customTimerEndAudio) {
    customTimerEndAudio.pause()
    customTimerEndAudio.currentTime = 0
  }
}
