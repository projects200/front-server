let audio: HTMLAudioElement | null = null

if (typeof window !== 'undefined') {
  audio = new Audio('/timerEnd.mp3')
}

export const timerEndSound = () => {
  if (audio) {
    audio.play().catch((error) => {
      console.error('오디오 재생 오류:', error)
    })
  }
}
