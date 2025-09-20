'use client'

import { Map, MapMarker } from 'react-kakao-maps-sdk'

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
  return (
    <div className={styles['container']}>
      <Map center={tempCenter} className={styles['map-container']}>
        <MapMarker position={tempMarker}></MapMarker>
      </Map>
    </div>
  )
}
