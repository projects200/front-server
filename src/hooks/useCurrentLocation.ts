import { useState, useCallback } from 'react'

type Location = {
  latitude: number
  longitude: number
}

type UseCurrentLocationReturn = {
  location: Location | null
  loading: boolean
  error: GeolocationPositionError | null
  getLocation: () => Promise<Location>
}

export default function useCurrentLocation(): UseCurrentLocationReturn {
  const [location, setLocation] = useState<Location | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<GeolocationPositionError | null>(null)

  const getLocation = useCallback((): Promise<Location> => {
    setLoading(true)
    setError(null)

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        setLoading(false)
        reject(new Error('Geolocation not supported'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords

          setLocation({ latitude, longitude })
          setLoading(false)
          resolve({ latitude, longitude })
        },
        (err) => {
          setError(err)
          setLoading(false)
          reject(err)
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: Infinity },
      )
    })
  }, [])

  return { location, loading, error, getLocation }
}
