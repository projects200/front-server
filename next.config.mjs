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