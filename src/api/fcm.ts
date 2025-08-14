import { fetchWrapper } from '@/utils/fetchWrapper'

// FCM 토큰 전달
export function createFcmToken(token: string, fcmToken: string): Promise<null> {
  return fetchWrapper<null>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/login`,
    {
      method: 'POST',
      headers: {
        'X-Fcm-Token': fcmToken,
      },
    },
    token,
  )
}

// FCM 토큰 삭제 요청
export function removeFcmToken(token: string, fcmToken: string): Promise<null> {
  return fetchWrapper<null>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/logout`,
    {
      method: 'POST',
      headers: {
        'X-Fcm-Token': fcmToken,
      },
    },
    token,
  )
}
