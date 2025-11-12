import { NotificationType } from "../fcm"

export type NotificationSettingItemsDto = {
  fcmToken: string
  workoutReminder: string
  chatMessage: string
}

export type NotificationSettingDto = {
  type: NotificationType;
  enabled: boolean;
}