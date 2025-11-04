'use client'

import clsx from 'clsx'
import { useState, useEffect, useMemo } from 'react'
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk'
import { useRouter } from 'next/navigation'
import { useQueryState, parseAsFloat } from 'nuqs'

import CloseIcon from '@/assets/icon_x.svg'
import Typography from '@/components/ui/typography'
import Modal from '@/components/ui/modal'
import useCurrentLocation from '@/hooks/useCurrentLocation'
import MascotCharacter from '@/assets/mascot_character.svg'
import CurrentLocationIcon from '@/assets/icon_current_location.svg'
import LoadingScreen from '@/components/commons/loadingScreen'
import { useReadMemberExerciseLocation } from '@/hooks/api/useMemberApi'
import { useReadExerciseLocationList } from '@/hooks/api/useExerciseLocationApi'
import { MemberProfile, MemberLocationFlattened } from '@/types/member'
import SITE_MAP from '@/constants/siteMap.constant'

import ClusterList from './clusterList'
import styles from './kakaoMap.module.css'

// 서울 시청 위도,경도
const SEOUL_CITY_HALL = {
  lat: 37.5667,
  lng: 126.9785,
}

export function flattenMemberLocations(
  members: MemberProfile[],
): MemberLocationFlattened[] {
  return members.flatMap((member) =>
    member.locationList.map((location) => ({
      memberId: member.memberId,
      profileThumbnailUrl: member.profileThumbnailUrl,
      profileImageUrl: member.profileImageUrl,
      nickname: member.nickname,
      gender: member.gender,
      birthDate: member.birthDate,
      location: location,
    })),
  )
}

export default function KakaoMap() {
  const router = useRouter()
  const [lat] = useQueryState('lat', parseAsFloat)
  const [lng] = useQueryState('lng', parseAsFloat)
  const { data: myData, isLoading: isMyDataLoading } =
    useReadExerciseLocationList()
  const { data: membersData } = useReadMemberExerciseLocation()
  const [mapCenter, setMapCenter] = useState(SEOUL_CITY_HALL)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [clusterData, setClusterData] = useState<MemberLocationFlattened[]>([])

  const {
    location,
    loading: locationLoading,
    getLocation,
  } = useCurrentLocation()

  useEffect(() => {
    if (isMyDataLoading || myData === undefined) return

    const hasSeenModal = Boolean(sessionStorage.getItem('hasSeenLocationModal'))

    if (myData.length === 0 && !hasSeenModal) {
      setIsModalOpen(true)
      sessionStorage.setItem('hasSeenLocationModal', 'true')
    }
  }, [myData, isMyDataLoading])

  const memberMarkers = useMemo(() => {
    if (!membersData) return []
    return flattenMemberLocations(membersData)
  }, [membersData])

  useEffect(() => {
    if (lat !== null && lng !== null) {
      setMapCenter({ lat, lng })
    } else {
      getLocation().catch(() => {})
    }
  }, [lat, lng, getLocation])

  useEffect(() => {
    if (location) {
      setMapCenter({
        lat: location.latitude,
        lng: location.longitude,
      })
    }
  }, [location])

  const handleCurrentLocationClick = async () => {
    try {
      await getLocation()
    } catch (error) {
      if (error instanceof GeolocationPositionError && error.code === 1) {
        alert(
          '위치 권한이 차단되었습니다. 브라우저의 사이트 설정에서 위치 권한을 허용해주세요.',
        )
      }
    }
  }

  if (locationLoading) return <LoadingScreen />

  return (
    <div className={styles['container']}>
      <Map center={mapCenter} level={3} className={styles['map-container']}>
        <MarkerClusterer
          averageCenter={true}
          minLevel={1}
          minClusterSize={1}
          disableClickZoom={true}
          styles={[
            {
              width: '40px',
              height: '40px',
              background: 'rgba(255, 57, 53, 0.8)',
              borderRadius: '50%',
              color: '#fff',
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: '40px',
              border: 'solid 1px #E53935',
            },
          ]}
          onClusterclick={(_target, cluster) => {
            const clusterMarkers = cluster.getMarkers().map((marker) => ({
              lat: marker.getPosition().getLat(),
              lng: marker.getPosition().getLng(),
            }))
            const ERROR = 0.000001
            const clickedData = memberMarkers.filter((marker) =>
              clusterMarkers.some(
                (location) =>
                  Math.abs(location.lat - marker.location.latitude) < ERROR &&
                  Math.abs(location.lng - marker.location.longitude) < ERROR,
              ),
            )

            setClusterData(clickedData)
            setIsBottomSheetOpen(true)
          }}
        >
          {memberMarkers.map((data, index) => (
            <MapMarker
              key={`${data.memberId}-${data.location.exerciseLocationName}-${index}`}
              position={{
                lat: data.location.latitude,
                lng: data.location.longitude,
              }}
              image={{
                src: '/assets/map_marker_red.svg',
                size: { width: 40, height: 40 },
              }}
              clickable={true}
              onClick={() => {
                router.replace(
                  `${SITE_MAP.MATCH_PROFILE}?memberId=${data.memberId}&lat=${data.location.latitude}&lng=${data.location.longitude}`,
                )
              }}
            />
          ))}
        </MarkerClusterer>
        {myData &&
          myData.map((data, index) => (
            <MapMarker
              key={`${data.name}-${index}`}
              position={{
                lat: data.latitude,
                lng: data.longitude,
              }}
              image={{
                src: '/assets/map_marker_my.svg',
                size: { width: 48, height: 75 },
              }}
              clickable={true}
              onClick={() => {
                router.push(`${SITE_MAP.MATCH_PLACE_LIST}`)
              }}
            />
          ))}
      </Map>

      {/* 내 위치 버튼 */}
      <button
        className={styles['current-location-button']}
        onClick={handleCurrentLocationClick}
      >
        <CurrentLocationIcon className={styles['current-location-icon']} />
      </button>

      {/* 클러스터 클릭 시 바텀 시트 */}
      <div
        className={clsx(styles['bottom-sheet-container'], {
          [styles['open']]: isBottomSheetOpen,
        })}
      >
        <div className={styles['bottom-sheet-header']}>
          <button onClick={() => setIsBottomSheetOpen(false)}>
            <CloseIcon className={styles['close-button']} />
          </button>
        </div>
        <ClusterList members={clusterData} />
      </div>

      {/* 진입 시 모달 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles['modal-section']}>
          <MascotCharacter className={styles['mascot']} />
          <Typography as="p" variant="content-large" weight="bold">
            어디서 운동하세요?
          </Typography>
          <Typography
            className={styles['modal-sub-text']}
            as="p"
            variant="content-small"
          >
            장소를 등록하면 근처 운동 친구들이
            <br /> 회원님을 찾을 수 있어요!
          </Typography>
          <button
            className={styles['modal-button']}
            onClick={() => router.push(SITE_MAP.MATCH_PLACE_REGISTER_SEARCH)}
          >
            <Typography as="div" variant="content-small" weight="bold">
              장소 등록하러 가기
            </Typography>
          </button>
        </div>
      </Modal>
    </div>
  )
}
