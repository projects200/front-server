import { NotificationSettingItems, NotificationSetting } from '@/types/fcm'
import { NotificationSettingDto } from '@/types/dto/fcm.dto'
import { adapterNotificationSettingListToDtoList } from '@/lib/adapters/fcm.adapter'
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

// 특정 기기 알림 상태 조회
export function readNotificationSettingList(
  token: string,
  fcmToken: string | null,
): Promise<NotificationSetting[]> {
  return fetchWrapper<NotificationSetting[]>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/notification-settings/device`,
    {
      method: 'GET',
      headers: {
        ...(fcmToken && { 'X-Fcm-Token': fcmToken }),
      },
    },
    token,
  )
}

// 알림 상태 수정(on/off)
export function updateNotificationSettingItems(
  token: string,
  fcmToken: string | null,
  data: NotificationSetting[],
): Promise<NotificationSettingItems> {
  const dotList: NotificationSettingDto[] =
    adapterNotificationSettingListToDtoList(data)
  return fetchWrapper<NotificationSettingItems>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/notification-settings/device`,
    {
      method: 'PATCH',
      headers: {
        ...(fcmToken && { 'X-Fcm-Token': fcmToken }),
      },
      body: JSON.stringify(dotList),
    },
    token,
  )
}
