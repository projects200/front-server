'use client'

import clsx from 'clsx'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk'
import { useRouter } from 'next/navigation'
import { useQueryState, parseAsFloat } from 'nuqs'

import type { MemberLocationParams } from '@/types/member'
import type { FilterItems } from '@/types/filter'
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
import { useToast } from '@/hooks/useToast'
import SITE_MAP from '@/constants/siteMap.constant'

import ClusterList from './clusterList'
import styles from './kakaoMap.module.css'

const SEOUL_CITY_HALL = {
  lat: 37.5667,
  lng: 126.9785,
}
const MAX_LEVEL_TO_SHOW_MARKERS = 8
const VIEWPORT_BUFFER_RATIO = 0.4
const DEFAULT_LEVEL = 3

const GENDER_MAP: Record<string, string> = {
  남성: 'MALE',
  여성: 'FEMALE',
}
const SKILL_MAP: Record<string, string> = {
  입문: 'BEGINNER',
  초급: 'ROOKIE',
  중급: 'INTERMEDIATE',
  고급: 'ADVANCED',
  숙련: 'SKILLED',
  선출: 'PRO',
}
const DAY_MAP: Record<string, number> = {
  월요일: 0,
  화요일: 1,
  수요일: 2,
  목요일: 3,
  금요일: 4,
  토요일: 5,
  일요일: 6,
}

const getAge = (birthDateString: string) => {
  const birthYear = new Date(birthDateString).getFullYear()
  const currentYear = new Date().getFullYear()
  return currentYear - birthYear + 1
}

const checkAge = (birthDate: string, ageFilter: string) => {
  const age = getAge(birthDate)
  if (ageFilter === '60대 이상') return age >= 60

  const filterPrefix = parseInt(ageFilter.replace('대', ''))
  return age >= filterPrefix && age < filterPrefix + 10
}

export function flattenMemberLocations(members: MemberProfile[]): MemberLocationFlattened[] {
  return members.flatMap((member) =>
    member.locationList.map((location) => ({
      memberId: member.memberId,
      profileThumbnailUrl: member.profileThumbnailUrl,
      profileImageUrl: member.profileImageUrl,
      nickname: member.nickname,
      gender: member.gender,
      birthDate: member.birthDate,
      memberScore: member.memberScore,
      preferredExerciseList: member.preferredExerciseList,
      location: location,
    })),
  )
}

type Props = {
  filters: FilterItems
}

export default function KakaoMap({ filters }: Props) {
  const router = useRouter()
  const showToast = useToast()
  const [lat] = useQueryState('lat', parseAsFloat)
  const [lng] = useQueryState('lng', parseAsFloat)

  const [cachedParams, setCachedParams] = useState<MemberLocationParams | null>(null)
  const [mapCenter, setMapCenter] = useState(SEOUL_CITY_HALL)
  const [currentLevel, setCurrentLevel] = useState(DEFAULT_LEVEL)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [clusterData, setClusterData] = useState<MemberLocationFlattened[]>([])

  const prevLevelRef = useRef(DEFAULT_LEVEL)

  const { data: myData, isLoading: isMyDataLoading } = useReadExerciseLocationList()
  const { data: membersData } = useReadMemberExerciseLocation(cachedParams)
  const { location, isLoading: locationLoading, getLocation } = useCurrentLocation()

  const isContained = (current: MemberLocationParams, cached: MemberLocationParams) => {
    return (
      current.leftTopLatitude <= cached.leftTopLatitude &&
      current.leftTopLongitude >= cached.leftTopLongitude &&
      current.rightBottomLatitude >= cached.rightBottomLatitude &&
      current.rightBottomLongitude <= cached.rightBottomLongitude
    )
  }

  const getExpandedBounds = (bounds: kakao.maps.LatLngBounds, ratio: number): MemberLocationParams => {
    const sw = bounds.getSouthWest()
    const ne = bounds.getNorthEast()

    const latDiff = ne.getLat() - sw.getLat()
    const lngDiff = ne.getLng() - sw.getLng()

    return {
      leftTopLatitude: ne.getLat() + latDiff * ratio,
      leftTopLongitude: sw.getLng() - lngDiff * ratio,
      rightBottomLatitude: sw.getLat() - latDiff * ratio,
      rightBottomLongitude: ne.getLng() + lngDiff * ratio,
    }
  }

  const handleMapIdle = (map: kakao.maps.Map) => {
    const level = map.getLevel()
    const isZoomChanged = prevLevelRef.current !== level

    setCurrentLevel(level)
    prevLevelRef.current = level

    if (level > MAX_LEVEL_TO_SHOW_MARKERS) {
      if (isZoomChanged) {
        showToast('운동장소 확인을 위해 지도를 확대해주세요', 'info')
      }

      if (cachedParams !== null) setCachedParams(null)
      return
    }

    const bounds = map.getBounds()
    const sw = bounds.getSouthWest()
    const ne = bounds.getNorthEast()
    const currentViewParams: MemberLocationParams = {
      leftTopLatitude: ne.getLat(),
      leftTopLongitude: sw.getLng(),
      rightBottomLatitude: sw.getLat(),
      rightBottomLongitude: ne.getLng(),
    }

    if (cachedParams && isContained(currentViewParams, cachedParams)) {
      return
    }

    const newExpandedParams = getExpandedBounds(bounds, VIEWPORT_BUFFER_RATIO)
    setCachedParams(newExpandedParams)
  }

  const memberMarkers = useMemo(() => {
    if (!membersData) return []

    const filteredMembers = membersData.filter((member) => {
      if (filters.gender && member.gender !== GENDER_MAP[filters.gender]) {
        return false
      }

      if (filters.age && !checkAge(member.birthDate, filters.age)) {
        return false
      }

      if (filters.score) {
        const minScore = parseInt(filters.score)
        if ((member.memberScore || 0) < minScore) {
          return false
        }
      }

      const hasMatchingExercise = member.preferredExerciseList.some((ex) => {
        if (filters.sport && ex.name !== filters.sport) {
          return false
        }

        if (filters.skill && ex.skillLevel !== SKILL_MAP[filters.skill]) {
          return false
        }

        if (filters.workoutDays.length > 0) {
          const isDayMatch = filters.workoutDays.some((day) => {
            const dayIndex = DAY_MAP[day]
            return ex.daysOfWeek[dayIndex] === true
          })
          if (!isDayMatch) return false
        }

        return true
      })

      const isExerciseFilterActive = filters.sport || filters.skill || filters.workoutDays.length > 0
      if (isExerciseFilterActive && !hasMatchingExercise) {
        return false
      }

      return true
    })

    return flattenMemberLocations(filteredMembers)
  }, [membersData, filters])

  const handleCurrentLocationClick = async () => {
    try {
      await getLocation()
    } catch (error) {
      if (error instanceof GeolocationPositionError && error.code === 1) {
        alert('위치 권한이 차단되었습니다. 브라우저의 사이트 설정에서 위치 권한을 허용해주세요.')
      }
    }
  }

  useEffect(() => {
    if (isMyDataLoading || myData === undefined) return

    const hasSeenModal = Boolean(sessionStorage.getItem('has_seen_location_modal'))

    if (myData.length === 0 && !hasSeenModal) {
      setIsModalOpen(true)
      sessionStorage.setItem('has_seen_location_modal', 'true')
    }
  }, [myData, isMyDataLoading])

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

  if (locationLoading) return <LoadingScreen />

  return (
    <div className={styles['container']}>
      <Map center={mapCenter} level={DEFAULT_LEVEL} className={styles['map-container']} onIdle={handleMapIdle}>
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
              clusterMarkers.some((location) => Math.abs(location.lat - marker.location.latitude) < ERROR && Math.abs(location.lng - marker.location.longitude) < ERROR),
            )

            setClusterData(clickedData)
            setIsBottomSheetOpen(true)
          }}
        >
          {currentLevel <= MAX_LEVEL_TO_SHOW_MARKERS &&
            memberMarkers.map((data, index) => (
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
                  router.replace(`${SITE_MAP.MATCH_PROFILE}?memberId=${data.memberId}&lat=${data.location.latitude}&lng=${data.location.longitude}`)
                }}
              />
            ))}
        </MarkerClusterer>
        {currentLevel <= MAX_LEVEL_TO_SHOW_MARKERS &&
          myData &&
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
      <button className={styles['current-location-button']} onClick={handleCurrentLocationClick}>
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
          <Typography className={styles['modal-sub-text']} as="p" variant="content-small">
            장소를 등록하면 근처 운동 친구들이
            <br /> 회원님을 찾을 수 있어요!
          </Typography>
          <button className={styles['modal-button']} onClick={() => router.push(SITE_MAP.MATCH_PLACE_REGISTER_SEARCH)}>
            <Typography as="div" variant="content-small" weight="bold">
              장소 등록하러 가기
            </Typography>
          </button>
        </div>
      </Modal>
    </div>
  )
}
