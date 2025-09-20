'use client'

import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'

import styles from './kakaoMap.module.css'

const tempCenter = {
  lat: 37.5667,
  lng: 126.9785,
}
const tempMarker = {
  lat: 37.5667,
  lng: 126.9785,
}

export default function KakaoMap() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY!,
    libraries: ['clusterer', 'drawing', 'services'],
  })

  if(loading || error) return null

  return (
    <div className={styles['container']}>
      <Map center={tempCenter} className={styles['map-container']}>
        <MapMarker position={tempMarker}></MapMarker>
      </Map>
    </div>
  )
}
