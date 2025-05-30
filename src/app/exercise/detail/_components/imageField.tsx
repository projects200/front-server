import styles from './imageField.module.css'

// 임시 이미지 영역
export default function ImageField() {
  return (
    <div className={styles['container']}>
      <div className={styles['temp']}></div>
    </div>
  )
}
