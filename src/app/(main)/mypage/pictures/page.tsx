'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'

import {
  useReadProfilePictureGroup,
  usePutRepProfilePicture,
  useDeleteProfilePicture,
} from '@/hooks/api/useProfileApi'
import LeftArrow from '@/assets/icon_left_arrow.svg'
import Typography from '@/components/ui/typography'
import KebabIcon from '@/assets/icon_kebab.svg'
import { useToast } from '@/hooks/useToast'

import ImageField from './_components/imageField'
import KebabModal from './_components/kebabModal'
import styles from './pictures.module.css'

export default function Pictures() {
  const showToast = useToast()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const { data, isLoading } = useReadProfilePictureGroup()
  const { trigger: putRepProfilePicture } = usePutRepProfilePicture()
  const { trigger: deleteProfilePicture } = useDeleteProfilePicture()

  // 사진순서 = 대표사진 + 나머지사진(대표사진 제외)
  const sortedImages = useMemo(() => {
    if (!data || data.profileImages.length === 0) {
      return []
    }
    const repImage = data.representativeProfileImage
    const allImages = data.profileImages
    if (repImage) {
      return [
        repImage,
        ...allImages.filter((img) => img.pictureId !== repImage.pictureId),
      ]
    }
    return allImages
  }, [data])

  useEffect(() => {
    if (sortedImages.length > 0 && currentIndex >= sortedImages.length) {
      setCurrentIndex(sortedImages.length - 1)
    }
  }, [sortedImages, currentIndex])

  // 대표 프로필 사진 지정 핸들러
  const handleRepPicture = async () => {
    const currentImage = sortedImages[currentIndex]
    try {
      await putRepProfilePicture({ pictureId: currentImage.pictureId })
      showToast('대표 사진으로 지정되었습니다.', 'info')
    } catch {}
    setCurrentIndex(0)
    setIsMenuOpen(false)
  }

// 프로필 사진 다운로드 핸들러
const handleDownload = async () => {
  const currentImage = sortedImages[currentIndex];
  if (!currentImage) return;

  setIsMenuOpen(false);

  let link: HTMLAnchorElement | null = null;
  let url: string | null = null;

  try {
    const response = await fetch(currentImage.profileImageUrl);
    if (!response.ok) {
      throw new Error(`서버 응답 오류: ${response.status}`);
    }

    const blob = await response.blob();
    url = window.URL.createObjectURL(blob);

    const fileName = `${currentImage.profileImageName || "profile"}.${currentImage.profileImageExtension || "jpg"}`;

    link = document.createElement("a");
    link.href = url;

    // 모바일 사파리 대응: download 속성은 시도하되, 없더라도 새 탭에서 열리게 fallback
    link.setAttribute("download", fileName);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");

    document.body.appendChild(link);
    link.click();

    showToast("이미지를 저장했습니다.", "info");
  } catch (error) {
    console.error(error);
    showToast("이미지 저장에 실패했습니다.", "info");
  } finally {
    // 다음 프레임에서 제거하여 click() 이벤트 누락 방지
    requestAnimationFrame(() => {
      if (link && link.parentNode) {
        document.body.removeChild(link);
      }
      if (url) {
        window.URL.revokeObjectURL(url);
      }
    });
  }
};

  // 프로필 사진 삭제 핸들러
  const handleDelete = async () => {
    if (!data) return
    const currentImage = sortedImages[currentIndex]

    try {
      await deleteProfilePicture({ pictureId: currentImage.pictureId })
      showToast('이미지를 삭제했습니다.', 'info')
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
              currentIndex={currentIndex}
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
