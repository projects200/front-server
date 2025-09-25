'use client'

import { useState, useEffect, useCallback } from 'react'
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk'

import { useToast } from '@/hooks/useToast'
import useCurrentLocation from '@/hooks/useCurrentLocation'
import Header from '@/components/commons/header'
import CompleteButton from '@/components/commons/completeButton'
import SearchIcon from '@/assets/icon_search.svg'
import CenterMarker from '@/assets/map_marker_black_noframe.svg'
import Typography from '@/components/ui/typography'

import styles from './placeRegisterSearch.module.css'

const SEOUL_CITY_HALL = {
  lat: 37.5667,
  lng: 126.9785,
}
type LatLng = { lat: number; lng: number }

type AddressInfo = {
  name: string
  address: string
}

type KakaoAddressResult = {
  address: {
    address_name: string
  }
  road_address: {
    address_name: string
    building_name: string
  } | null
}

type KakaoSearchResultItem = {
  id: string
  place_name: string
  road_address_name: string
  address_name: string
  x: string
  y: string
}

export default function PlaceRegisterSearch() {
  const [mapLevel, setMapLevel] = useState(3)
  const [searchValue, setSearchValue] = useState('')
  const [mapCenter, setMapCenter] = useState(SEOUL_CITY_HALL)
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    name: '',
    address: '',
  })
  const [searchResults, setSearchResults] = useState<KakaoSearchResultItem[]>(
    [],
  )
  const [isResultListVisible, setIsResultListVisible] = useState(false)
  const [kakaoMapLoading, kakaoMapError] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY!,
    libraries: ['clusterer', 'drawing', 'services'],
  })
  const {
    location,
    loading: locationLoading,
    getLocation,
  } = useCurrentLocation()
  const showToast = useToast()

  // 좌표 이동시 도로명 주소 변경
  const updateAddressFromCoords = useCallback((coords: LatLng) => {
    if (!window.kakao) return
    const geocoder = new window.kakao.maps.services.Geocoder()

    const callback = (
      result: KakaoAddressResult[],
      status: kakao.maps.services.Status,
    ) => {
      if (status === window.kakao.maps.services.Status.OK && result[0]) {
        const data = result[0]
        setAddressInfo({
          name: '',
          address: data.road_address?.address_name || data.address.address_name,
        })
      } else {
        setAddressInfo({ name: '', address: '주소를 찾을 수 없습니다.' })
      }
    }
    geocoder.coord2Address(coords.lng, coords.lat, callback)
  }, [])

  // 키워드 검색 실행
  const handleSearch = () => {
    if (!searchValue.trim()) {
      showToast('검색어를 입력해주세요.', 'info')
      return
    }
    if (kakaoMapLoading || !window.kakao) return

    const ps = new window.kakao.maps.services.Places()
    ps.keywordSearch(searchValue, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResults(data as KakaoSearchResultItem[])
        setIsResultListVisible(true)
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 없습니다.')
        setSearchResults([])
      } else {
        alert('검색 중 오류가 발생했습니다.')
      }
    })
  }

  // 검색된 결과에서 항목 선택시
  const handleSelectPlace = (place: KakaoSearchResultItem) => {
    const newCenter = {
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
    }
    setMapCenter(newCenter)
    setAddressInfo({
      name: place.place_name,
      address: place.road_address_name || place.address_name,
    })
    setMapLevel(1)
    setIsResultListVisible(false)
  }

  // --- 함수: 검색 목록에서 뒤로가기 ---
  const handleBackFromSearch = () => {
    setIsResultListVisible(false)
  }

  // 인풋필드 이벤트 힌들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  // Enter 키 입력 감지 함수
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  // 지도를 움직이면 중심좌표를 읽어와 저장
  const handleMapDragEnd = (map: kakao.maps.Map) => {
    const newCenter = map.getCenter()
    const newCoords = { lat: newCenter.getLat(), lng: newCenter.getLng() }
    setMapCenter(newCoords)
    updateAddressFromCoords(newCoords)
  }

  const handleZoomChanged = (map: kakao.maps.Map) => {
    setMapLevel(map.getLevel())
    const currentCenter = new window.kakao.maps.LatLng(
      mapCenter.lat,
      mapCenter.lng,
    )
    map.setCenter(currentCenter)
  }

  // 페이지 진입시 현재 위치를 가져옴
  useEffect(() => {
    getLocation().catch(() => {})
  }, [getLocation])

  useEffect(() => {
    if (location) {
      const newCenter = { lat: location.latitude, lng: location.longitude }
      setMapCenter(newCenter)
      updateAddressFromCoords(newCenter)
    }
  }, [location])

  if (kakaoMapLoading || locationLoading || kakaoMapError) return null

  return (
    <div className={styles['container']}>
      <Header
        className="fill-space-title"
        rightIcon={<CompleteButton>검색</CompleteButton>}
        onClick={handleSearch}
        onBack={isResultListVisible ? handleBackFromSearch : undefined}
      >
        <div className={styles['search-section']}>
          <SearchIcon className={styles['search-icon']} />
          <input
            className={styles['input']}
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="운동하는 장소 검색"
          />
        </div>
      </Header>

      {isResultListVisible ? (
        // --- 검색 목록 뷰 ---
        <div className={styles['search-results-container']}>
          {searchResults.map((place) => (
            <div
              key={place.id}
              className={styles['result-item']}
              onClick={() => handleSelectPlace(place)}
            >
              <Typography as="div" variant="text18" weight="medium">
                {place.place_name}
              </Typography>
              <Typography
                variant="text14"
                className={styles['result-address']}
                as="div"
              >
                {place.road_address_name || place.address_name}
              </Typography>
            </div>
          ))}
        </div>
      ) : (
        // --- 지도 뷰 ---
        <div className={styles['map-view-container']}>
          <div className={styles['map-section']}>
            <Map
              center={mapCenter}
              level={mapLevel}
              className={styles['map']}
              onDragEnd={handleMapDragEnd}
              onZoomChanged={handleZoomChanged}
            ></Map>
            <CenterMarker className={styles['center-icon']} />
          </div>
          <div className={styles['bottom-section']}>
            {addressInfo.name ? (
              <div className={styles['address-section']}>
                <Typography as="span" variant="text18" weight="medium">
                  {addressInfo.name}
                </Typography>
                <Typography
                  className={styles['address-sub-text']}
                  as="span"
                  variant="text15"
                >
                  {addressInfo.address}
                </Typography>
              </div>
            ) : (
              <Typography as="span" variant="text18" weight="medium">
                {addressInfo.address}
              </Typography>
            )}
            <button onClick={() => {}}>
              <CompleteButton>등록</CompleteButton>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
