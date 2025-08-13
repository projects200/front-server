// import withPWAInit from '@ducanh2912/next-pwa'

// const pwaConfig = {
//   dest: 'public',
//   customWorkerSrc: 'src/firebase-messaging-sw.js',
//   register: true,
//   skipWaiting: true,
//   // disable: process.env.NODE_ENV === 'development',
// }

const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  images: {
    unoptimized: true,
    domains: [process.env.NEXT_PUBLIC_S3_BUCKET_DOMAIN],
  },

  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
    })

    if (dev) {
      config.cache = false
    }

    return config
  },
}
export default nextConfig

// const withPWA = withPWAInit(pwaConfig)
// export default withPWA(nextConfig)
