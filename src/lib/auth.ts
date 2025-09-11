import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

import SITE_MAP from '@/constants/siteMap.constant'

const createCookieStorage = (ttlSeconds = 300) => {
  return {
    getItem(key: string) {
      const name = encodeURIComponent(key) + '='
      const cookies = document.cookie
        .split('; ')
        .find((c) => c.startsWith(name))
      if (!cookies) return null
      const value = cookies.split('=')[1]
      try {
        return decodeURIComponent(value)
      } catch {
        return value
      }
    },
    setItem(key: string, value: string) {
      const maxAge = ttlSeconds
      const cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; Secure; SameSite=None`
      document.cookie = cookie
    },
    removeItem(key: string) {
      document.cookie = `${encodeURIComponent(key)}=; Max-Age=0; Path=/; Secure; SameSite=None`
    },
  } as Storage
}

const isBrowser = typeof window !== 'undefined'

const cognitoAuthConfig = {
  authority: `https://cognito-idp.ap-northeast-2.amazonaws.com/ap-northeast-2_${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
  client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
  redirect_uri: `${process.env.NEXT_PUBLIC_UNDABANG_URI}/auth/callback`,
  silent_redirect_uri: `${process.env.NEXT_PUBLIC_UNDABANG_URI}/silentRenew.html`,
  response_type: 'code',
  scope: 'openid profile email phone',
  ...(isBrowser && {
    userStore: new WebStorageStateStore({ store: window.sessionStorage }),
    stateStore: new WebStorageStateStore({ store: createCookieStorage(300) }),
  }),
  automaticSilentRenew: true,
}

export const userManager = new UserManager(cognitoAuthConfig)

if (isBrowser) {
  userManager.events.addSilentRenewError((error) => {
    console.error('Silent renew error:', error)
    userManager.removeUser().then(() => {
      window.location.href = SITE_MAP.LOGIN
    })
  })

  userManager.events.addAccessTokenExpired(() => {
    console.log('Access token expired')
    userManager.removeUser().then(() => {
      window.location.href = SITE_MAP.LOGIN
    })
  })
}

export async function signOutRedirect() {
  try {
    await userManager.removeUser()
  } catch (err) {
    console.log(`userManager 유저 삭제 에러: ${err}`)
  }

  const logoutUri = `${process.env.NEXT_PUBLIC_UNDABANG_URI}/auth/login`
  const logoutDomain = `https://ap-northeast-2${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}.auth.ap-northeast-2.amazoncognito.com`
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!
  window.location.href = `${logoutDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
    logoutUri,
  )}`
}

export async function redirectToSocialLogin(provider: 'Google' | 'kakao') {
  console.log('before redirect session keys', Object.keys(sessionStorage))
  console.log('before redirect cookies', document.cookie)
  await userManager.signinRedirect({
    extraQueryParams: {
      identity_provider: provider,
      prompt: 'select_account',
    },
  })
}
