'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Typography from '@/components/ui/typography'
import LocationMarkerIcon from '@/assets/icon_location_marker.svg'
import KebabIcon from '@/assets/icon_kebab.svg'
import KebabModal from '@/components/commons/kebabModal'
import { useDeleteExerciseLocation } from '@/hooks/api/useExerciseLocationApi'
import { ExerciseLocationId, ExerciseLocation } from '@/types/exerciseLocation'
import SITE_MAP from '@/constants/siteMap.constant'

import styles from './listCard.module.css'

type Props = {
  placeData: ExerciseLocationId & ExerciseLocation
}

export default function ListCard({ placeData }: Props) {
  const router = useRouter()
  const { trigger: deleteExerciseLocation } = useDeleteExerciseLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleKebabClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMenuOpen(true)
  }

  const handleOnEdit = () => {
    const params = new URLSearchParams()
    params.append('id', placeData.id.toString())
    params.append('lat', parseFloat(placeData.latitude.toFixed(10)).toString())
    params.append('lng', parseFloat(placeData.longitude.toFixed(10)).toString())
    params.append('name', placeData.name)
    params.append('address', placeData.address)
    router.push(`${SITE_MAP.MATCH_PLACE_REGISTER_EDIT}?${params.toString()}`)
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
          <Typography as="span" variant="title-small" weight="bold">
            {placeData.name}
          </Typography>
          <Typography
            as="span"
            variant="content-large"
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
