import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk'

export default function useKakaoLoader() {
  const [loading, error] = useKakaoLoaderOrigin({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY!,
    libraries: ['clusterer', 'drawing', 'services'],
  })
  if (!loading && error) {
    console.log(error)
  }
}
