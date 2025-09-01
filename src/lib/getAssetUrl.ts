//public 폴더의 정적 파일 경로에 캐시 버스팅을 위한 버전 쿼리 스트링을 추가합니다.
export const getAssetUrl = (path: string): string => {
  const buildVersion = process.env.NEXT_PUBLIC_BUILD_VERSION

  if (buildVersion) {
    return `${path}?v=${buildVersion}`
  }

  return path
}
