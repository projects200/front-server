'use client'

import styles from './detailStep.module.css'

type Props = {
  nickName: string
}

export default function DetailStep({ nickName }: Props) {
  return <div className={styles['content']}>{nickName}</div>
}
