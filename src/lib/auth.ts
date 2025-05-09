import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

const isBrowser = typeof window !== 'undefined'

const cognitoAuthConfig = {
  authority: `https://cognito-idp.ap-northeast-2.amazonaws.com/ap-northeast-2_${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
  client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
  redirect_uri: `${process.env.NEXT_PUBLIC_UNDABANG_URI}/callback`,
  silent_redirect_uri: `${process.env.NEXT_PUBLIC_UNDABANG_URI}/silentRenew.html`,
  response_type: 'code',
  scope: 'openid profile email phone',
  ...(isBrowser && {
    userStore: new WebStorageStateStore({ store: window.localStorage }),
  }),
  automaticSilentRenew: true,
}

export const userManager = new UserManager(cognitoAuthConfig)

export async function signOutRedirect() {
  await userManager.removeUser()

  const logoutUri = process.env.NEXT_PUBLIC_UNDABANG_URI!
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
    },
  })
}
