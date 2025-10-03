import { DotLottieReact } from '@lottiefiles/dotlottie-react'

import Button from '@/components/ui/button'
import Typography from '@/components/ui/typography'

import styles from './celebration.module.css'

type Props = {
  onConfirm: () => void
  earnedPoints: number
}

export default function Celebration({ onConfirm, earnedPoints }: Props) {
  return (
    <div className={styles['overlay']}>
      <div className={styles['modal']}>
        <Typography as="div" variant="title-small" weight="bold">
          축하해요!
        </Typography>
        <Typography as="div" variant="title-small" weight="bold">
          운동 점수를 {earnedPoints}점 획득했어요
        </Typography>
        <DotLottieReact
          className={styles['lottie']}
          src="/celebrate.lottie"
          speed={0.8}
          autoplay
          loop
        />

        <Button
          className={styles['button']}
          variant="primary"
          onClick={onConfirm}
        >
          확인
        </Button>
      </div>
    </div>
  )
}
