import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

import { useRegistrationStore } from '@/store/useRegistrationStore'
import SITE_MAP from '@/constants/siteMap.constant'

const isBrowser = typeof window !== 'undefined'

const cognitoAuthConfig = {
  authority: `https://cognito-idp.ap-northeast-2.amazonaws.com/ap-northeast-2_${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
  client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
  redirect_uri: `${process.env.NEXT_PUBLIC_UNDABANG_URI}/callback`,
  silent_redirect_uri: `${process.env.NEXT_PUBLIC_UNDABANG_URI}/silentRenew.html`,
  response_type: 'code',
  scope: 'openid profile email phone',
  ...(isBrowser && {
    userStore: new WebStorageStateStore({ store: window.sessionStorage }),
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
  await userManager.removeUser()
  useRegistrationStore.getState().resetRegistered()
  const logoutUri = `${process.env.NEXT_PUBLIC_UNDABANG_URI}/login`
  const logoutDomain = `https://ap-northeast-2${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}.auth.ap-northeast-2.amazoncognito.com`
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!
  window.location.href = `${logoutDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
    logoutUri,
  )}`
}

export async function redirectToSocialLogin(provider: 'Google' | 'kakao') {
  await userManager.signinRedirect({
    extraQueryParams: {
      identity_provider: provider,
      prompt: 'select_account',
    },
  })
}
