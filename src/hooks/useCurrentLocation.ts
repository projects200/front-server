import { useState, useCallback } from 'react'

type Location = {
  latitude: number
  longitude: number
}

type UseCurrentLocationReturn = {
  location: Location | null
  loading: boolean
  error: GeolocationPositionError | null
  getLocation: () => void
}

export default function useCurrentLocation(): UseCurrentLocationReturn {
  const [location, setLocation] = useState<Location | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<GeolocationPositionError | null>(null)

  const handleSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords
    setLocation({ latitude, longitude })
    setLoading(false)
  }

  const handleError = (err: GeolocationPositionError) => {
    setError(err)
    setLoading(false)
  }

  const getLocation = useCallback(() => {
    setLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setLoading(false)
      console.log('현재브라우저는 GeoLocation이 지원되지 않습니다.')
      return
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
  }, [])

  return { location, loading, error, getLocation }
}
