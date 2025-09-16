'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

import {
  useReadProfilePictureGroup,
  usePutRepProfilePicture,
  useDeleteProfilePicture,
} from '@/hooks/useProfileApi'
import LeftArrow from '@/assets/icon_left_arrow.svg'
import Typography from '@/components/ui/typography'
import KebabIcon from '@/assets/icon_kebab.svg'
import ImageField from './_components/imageField'

import KebabModal from './_components/kebabModal'
import styles from './pictures.module.css'

export default function Pictures() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const { data, isLoading } = useReadProfilePictureGroup()
  const { trigger: putRepProfilePicture } = usePutRepProfilePicture()
  const { trigger: deleteProfilePicture } = useDeleteProfilePicture()

  // 사진순서 = 대표사진 + 나머지사진(대표사진 제외)
  const sortedImages = useMemo(() => {
    if (!data) return []
    const repImage = data.representativeProfileImage
    const otherImages = data.profileImages.filter(
      (img) => img.pictureId !== repImage.pictureId,
    )
    return [repImage, ...otherImages]
  }, [data])

  // 대표 프로필 사진 지정 핸들러
  const handleRepPicture = async () => {
    const currentImage = sortedImages[currentIndex]
    try {
      await putRepProfilePicture({ pictureId: currentImage.pictureId })
    } catch {}
    setCurrentIndex(0)
    setIsMenuOpen(false)
  }

  // 프로필 사진 다운로드 핸들러
  const handleDownload = async () => {
    const currentImage = sortedImages[currentIndex]
    setIsMenuOpen(false)
    try {
      const response = await fetch(currentImage.profileImageUrl)
      if (!response.ok) {
        throw new Error('이미지를 다운로드할 수 없습니다.')
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `${currentImage.profileImageName}.${currentImage.profileImageExtension}`,
      )
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('다운로드 실패:', error)
      alert('사진을 다운로드하는 데 실패했습니다.')
    }
  }

  // 프로필 사진 삭제 핸들러
  const handleDelete = async () => {
    if (!data) return
    const currentImage = sortedImages[currentIndex]

    try {
      await deleteProfilePicture({ pictureId: currentImage.pictureId })
    } catch {}
    setIsMenuOpen(false)

    if (sortedImages.length <= 1) {
      router.back()
    }
  }

  const handleKebabClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMenuOpen(true)
  }

  // 메뉴 외부를 클릭하면 닫히도록 하는 로직
  const menuRef = (node: HTMLDivElement) => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!node.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }

  if (isLoading || !data) return null

  return (
    <div className={styles['container']}>
      <header className={styles['header']}>
        <div className={styles['left']}>
          <button onClick={() => router.back()}>
            <LeftArrow className={styles['back-icon']} />
          </button>
        </div>
        <div className={styles['step']}>
          <Typography as="span" variant="text15">
            {currentIndex + 1}
          </Typography>
          <Typography
            className={styles['step-suffix']}
            as="span"
            variant="text15"
          >
            /
          </Typography>
          <Typography
            className={styles['step-suffix']}
            as="span"
            variant="text15"
          >
            {sortedImages.length}
          </Typography>
        </div>
        <div className={styles['kebab-container']}>
          <button className={styles['right-icon']} onClick={handleKebabClick}>
            <KebabIcon className={styles['kebab-icon']} />
          </button>
          {isMenuOpen && (
            <KebabModal
              ref={menuRef}
              onRepPicture={handleRepPicture}
              onDownload={handleDownload}
              onDelete={handleDelete}
            />
          )}
        </div>
      </header>
      <div className={styles['img-section']}>
        {data.profileImages.length ? (
          <ImageField
            images={sortedImages}
            selectedIndex={currentIndex}
            onSlideChange={setCurrentIndex}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
