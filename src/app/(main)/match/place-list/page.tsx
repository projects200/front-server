'use client'

import { useRouter } from 'next/navigation'

import Typography from '@/components/ui/typography'
import Header from '@/components/commons/header'
import CompleteButton from '@/components/commons/completeButton'

import { useReadExerciseLocationList } from '@/hooks/api/useExerciseLocationApi'
import SITE_MAP from '@/constants/siteMap.constant'
import { useToast } from '@/hooks/useToast'

import ListCard from './_components/listCard'
import styles from './placeList.module.css'

export default function PlaceList() {
  const { data: locationList } = useReadExerciseLocationList()
  const showToast = useToast()
  const router = useRouter()

  const handleLinkClick = () => {
    if (locationList && locationList.length >= 10) {
      showToast('운동장소는 최대 10개까지 등록 가능합니다.', 'info')
      return
    }
    router.push(SITE_MAP.MATCH_PLACE_REGISTER_SEARCH)
  }

  return (
    <div className={styles['container']}>
      <Header
        onClick={handleLinkClick}
        rightIcon={<CompleteButton>추가</CompleteButton>}
      >
        운동장소
      </Header>

      <div className={styles['list-section']}>
        {locationList && locationList.length ? (
          locationList.map((data) => (
            <ListCard key={`list-item-${data.id}`} placeData={data} />
          ))
        ) : (
          <div className={styles['empty-section']}>
            <Typography
              as="span"
              variant="content-large"
              className={styles['empty-text']}
            >
              등록된 운동 장소가 없습니다
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}
