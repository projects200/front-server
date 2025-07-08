import React from 'react'

import { ScoreState } from '@/types/member'
import LowImage from '@/assets/low_point_face.svg'
import MiddleImage from '@/assets/middle_point_face.svg'
import HighImage from '@/assets/high_point_face.svg'

import styles from './characterFace.module.css'

type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>

const stateToFaceMap: Record<ScoreState, SvgComponent | null> = {
  low: LowImage,
  middle: MiddleImage,
  high: HighImage,
  loading: null,
}

type Props = {
  state: ScoreState
}
export const CharacterFace = ({ state }: Props) => {
  const FaceComponent = stateToFaceMap[state]
  return (
    <div className={styles['container']}>
      {FaceComponent && <FaceComponent className={styles['img']} />}
    </div>
  )
}
