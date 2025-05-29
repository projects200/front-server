import clsx from 'clsx'

import { useToast } from '@/hooks/useToast'
import XButtonIcon from '@/assets/icon_x_button.svg'
import CameraIcon from '@/assets/icon_camera.svg'
import Typography from '@/components/ui/typography'

import styles from './imageUploader.module.css'

type ImageUploaderProps = {
  className?: string
  images: File[]
  setImages: (files: File[]) => void
}

const ImageUploader = ({
  className,
  images,
  setImages,
}: ImageUploaderProps) => {
  const showToast = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)

      const filteredFiles = fileArray.filter((file) => {
        const isValidType = ['image/jpeg', 'image/jpg', 'image/png'].includes(
          file.type,
        )
        const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
        return isValidType && isValidSize
      })

      if (filteredFiles.length !== fileArray.length) {
        showToast(
          'jpg, jpeg, png 파일만 가능하며, 용량은 10MB 이하만 업로드할 수 있습니다.',
          'info',
        )
      }

      if (images.length + filteredFiles.length > 5) {
        showToast('이미지는 최대 5개까지 업로드할 수 있습니다.', 'info')
        return
      }

      setImages([...images, ...filteredFiles])
    }
  }

  const handleRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <div className={clsx(className, styles['container'])}>
      <label className={styles['upload-box']}>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          hidden
          multiple
        />
        <CameraIcon className={styles['camera-icon']} />
        <Typography as="span" variant="text12">
          사진 추가하기
        </Typography>
      </label>
      {images.map((image, index) => (
        <div key={index} className={styles['preview-box']}>
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className={styles['preview']}
          />
          <button
            type="button"
            className={styles['button']}
            onClick={() => handleRemove(index)}
          >
            <XButtonIcon className={styles['x-button']} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default ImageUploader
