import {
  createFcmToken,
  removeFcmToken,
  readNotificationSettingList,
  updateNotificationSettingItems,
} from '@/api/fcm'
import {
  adapterNotificationSettingItems,
  adapterNotificationSettingList,
} from '@/lib/adapters/fcm.adapter'
import { NotificationSetting, NotificationSettingItems } from '@/types/fcm'

import useApiGet from './useApiGet'
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

// 특정 기기 알림 상태 조회
export const useReadNotificationSettingList = (fcmToken: string | null) =>
  useApiGet<NotificationSetting[]>(
    ['fcm/read/notificationSetting'],
    (token) =>
      readNotificationSettingList(token, fcmToken).then(
        adapterNotificationSettingList,
      ),
    {
      shouldFetch: !!fcmToken,
    },
  )

// 알림 상태 수정(on/off)
export const usePatchNotificationSettingItems = (fcmToken: string | null) =>
  useApiMutation<NotificationSettingItems, NotificationSetting[]>(
    ['fcm/update/notificationSetting'],
    (token, data) =>
      updateNotificationSettingItems(token, fcmToken, data).then(
        adapterNotificationSettingItems,
      ),
    {
      shouldFetch: !!fcmToken,
    },
  )
