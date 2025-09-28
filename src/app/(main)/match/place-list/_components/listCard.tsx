'use client'

import { useState } from 'react'

import Typography from '@/components/ui/typography'
import LocationMarkerIcon from '@/assets/icon_location_marker.svg'
import KebabIcon from '@/assets/icon_kebab.svg'
import KebabModal from '@/components/commons/kebabModal'
import { useDeleteExerciseLocation } from '@/hooks/api/useExerciseLocationApi'
import { ExerciseLocationId, ExerciseLocation } from '@/types/exerciseLocation'

import styles from './listCard.module.css'

type Props = {
  placeData: ExerciseLocationId & ExerciseLocation
}

export default function ListCard({ placeData }: Props) {
  const { trigger: deleteExerciseLocation } = useDeleteExerciseLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleKebabClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMenuOpen(true)
  }

  const handleOnEdit = () => {
    // 수정 로직
    alert('수정 로직 개발중')
  }

  const handleOnDelete = async () => {
    try {
      await deleteExerciseLocation({
        id: placeData.id,
      })
    } catch {}
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

  return (
    <>
      <div className={styles['list-item']}>
        <LocationMarkerIcon className={styles['marker-icon']} />
        <div className={styles['list-item-text']}>
          <Typography as="span" variant="content-large" weight="bold">
            {placeData.name}
          </Typography>
          <Typography
            as="span"
            variant="content-small"
            className={styles['address']}
          >
            {placeData.address}
          </Typography>
        </div>
        <div className={styles['kebab-container']}>
          <button className={styles['kebab-button']} onClick={handleKebabClick}>
            <KebabIcon className={styles['kebab-icon']} />
          </button>
          {isMenuOpen && (
            <KebabModal
              ref={menuRef}
              onEdit={() => {
                handleOnEdit()
                setIsMenuOpen(false)
              }}
              onDelete={() => {
                handleOnDelete()
                setIsMenuOpen(false)
              }}
            />
          )}
        </div>
      </div>
      <div className={styles['divider']}></div>
    </>
  )
}
