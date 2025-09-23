'use client'

import { useState, useEffect } from 'react'
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'

import useCurrentLocation from '@/hooks/useCurrentLocation'
import CurrentLocationIcon from '@/assets/icon_current_location.svg'
import LoadingScreen from '@/components/commons/loadingScreen'

import styles from './kakaoMap.module.css'

import { TEMP_DATA } from '../tempData'

const SEOUL_CITY_HALL = {
  lat: 37.5667,
  lng: 126.9785,
}

export default function KakaoMap() {
  const [mapCenter, setMapCenter] = useState(SEOUL_CITY_HALL)
  const [kakaoMapLoading, kakaoMapError] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY!,
    libraries: ['clusterer', 'drawing', 'services'],
  })
  const {
    location,
    loading: locationLoading,
    getLocation,
  } = useCurrentLocation()

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

  if (kakaoMapLoading || locationLoading || kakaoMapError)
    return <LoadingScreen />

  return (
    <div className={styles['container']}>
      <Map
        center={mapCenter}
        level={4}
        draggable={true}
        className={styles['map-container']}
      >
        {/* 내위치
        <MapMarker position={mapCenter} /> */}
        {TEMP_DATA.map((data) => (
          <MapMarker
            key={`${data.exerciseLocationName}-${data.latitude},${data.longitude}`}
            position={{ lat: data.latitude, lng: data.longitude }}
            image={{
              src: '/assets/map_marker.svg',
              size: { width: 40, height: 40 },
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
