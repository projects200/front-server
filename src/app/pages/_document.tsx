import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const nonce = process.env.NEXT_PUBLIC_CSP_NONCE

  return (
    <Html lang="ko" nonce={nonce}>
      <Head />
      <body>
        <Main />
        <NextScript nonce={nonce} />
      </body>
    </Html>
  )
}
