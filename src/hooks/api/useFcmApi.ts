import { createFcmToken, removeFcmToken } from '@/api/fcm'

import useApiMutation from './useApiMutation'

// FCM 토큰 백엔드로 전송
export const usePostFcmToken = () =>
  useApiMutation<null, string>(
    ['fcm/login'],
    (token, data) => createFcmToken(token, data),
    {},
  )

// FCM 토큰 삭제 요청
export const useDeleteFcmToken = () =>
  useApiMutation<null, string>(
    ['fcm/logout'],
    (token, data) => removeFcmToken(token, data),
    {},
  )
