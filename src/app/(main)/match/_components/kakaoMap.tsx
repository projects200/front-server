'use client'

import { useState, useEffect } from 'react'
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'

import useCurrentLocation from '@/hooks/useCurrentLocation'
import CurrentLocationIcon from '@/assets/icon_current_location.svg'
import LoadingScreen from '@/components/commons/loadingScreen'

import styles from './kakaoMap.module.css'

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
    loading: getLocationLoading,
    getLocation,
  } = useCurrentLocation()

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    if (location) {
      setMapCenter({
        lat: location.latitude,
        lng: location.longitude,
      })
    }
  }, [location])

  if (kakaoMapLoading || getLocationLoading || kakaoMapError)
    return <LoadingScreen />

  return (
    <div className={styles['container']}>
      <Map center={mapCenter} className={styles['map-container']}>
        <MapMarker position={mapCenter}></MapMarker>
      </Map>
      <button
        className={styles['current-location-button']}
        onClick={getLocation}
      >
        <CurrentLocationIcon className={styles['current-location-icon']} />
      </button>
    </div>
  )
}
