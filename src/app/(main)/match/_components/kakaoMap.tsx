'use client'

import { useState, useEffect, useMemo } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useRouter } from 'next/navigation'

import useCurrentLocation from '@/hooks/useCurrentLocation'
import CurrentLocationIcon from '@/assets/icon_current_location.svg'
import LoadingScreen from '@/components/commons/loadingScreen'
import { useReadMemberExerciseLocation } from '@/hooks/api/useMemberApi'
import { MemberProfile, MemberLocationFlattened } from '@/types/member'
import SITE_MAP from '@/constants/siteMap.constant'

import styles from './kakaoMap.module.css'

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
  const { data: membersData } = useReadMemberExerciseLocation()
  const [mapCenter, setMapCenter] = useState(SEOUL_CITY_HALL)
  const {
    location,
    loading: locationLoading,
    getLocation,
  } = useCurrentLocation()
  const markers = useMemo(() => {
    if (!membersData) return []
    return flattenMemberLocations(membersData)
  }, [membersData])

  useEffect(() => {
    getLocation().catch(() => {})
  }, [getLocation])

  useEffect(() => {
    if (location) {
      setMapCenter({
        lat: location.latitude,
        lng: location.longitude,
      })
    }
  }, [location])

  // 에러가 있고, 그 코드가 1번(PERMISSION_DENIED)이라면 사용자에게 안내
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
        {markers.map((data, index) => (
          <MapMarker
            key={`${data.location.exerciseLocationName}-${index}`}
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
              router.push(`${SITE_MAP.MATCH_PROFILE}?memberId=${data.memberId}`)
            }}
          />
        ))}
      </Map>
      <button
        className={styles['current-location-button']}
        onClick={handleCurrentLocationClick}
      >
        <CurrentLocationIcon className={styles['current-location-icon']} />
      </button>
    </div>
  )
}
