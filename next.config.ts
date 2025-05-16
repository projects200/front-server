import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'export',
  // api의 cors정책에 빠진부분이 있는듯하여 해결시 삭제될 코드입니다.
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://api.undabang.store/dev/:path*',
  //     },
  //   ]
  // },
}

export default nextConfig
