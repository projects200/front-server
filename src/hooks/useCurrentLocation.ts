import { useState, useCallback } from 'react'

type Location = {
  latitude: number
  longitude: number
}

type UseCurrentLocationReturn = {
  location: Location | null
  isLoading: boolean
  error: GeolocationPositionError | null
  getLocation: () => Promise<Location>
}

export default function useCurrentLocation(): UseCurrentLocationReturn {
  const [location, setLocation] = useState<Location | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<GeolocationPositionError | null>(null)

  const getLocation = useCallback((): Promise<Location> => {
    setIsLoading(true)
    setError(null)

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        setIsLoading(false)
        reject(new Error('Geolocation not supported'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords

          setLocation({ latitude, longitude })
          setIsLoading(false)
          resolve({ latitude, longitude })
        },
        (err) => {
          setError(err)
          setIsLoading(false)
          reject(err)
        },
        {
          enableHighAccuracy: false,
          timeout: 30000,
          maximumAge: 5 * 60 * 1000, //5분
        },
      )
    })
  }, [])

  return { location, isLoading, error, getLocation }
}
