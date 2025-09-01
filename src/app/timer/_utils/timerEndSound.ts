import { getAssetUrl } from '@/lib/getAssetUrl'

let simpleTimerEndAudio: HTMLAudioElement | null = null
let customTimerEndAudio: HTMLAudioElement | null = null

if (typeof window !== 'undefined') {
  simpleTimerEndAudio = new Audio(getAssetUrl('/sound_simple_timer_end.wav'))
  customTimerEndAudio = new Audio(getAssetUrl('/sound_custom_timer_end.wav'))
}

export const simpleTimerEndSound = () => {
  if (simpleTimerEndAudio) {
    simpleTimerEndAudio.play().catch((err) => {
      console.log(err)
    })
  }
}
export const customTimerEndSound = () => {
  if (customTimerEndAudio) {
    customTimerEndAudio.play().catch(() => {})
  }
}
