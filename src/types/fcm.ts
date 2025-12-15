export type NotificationType = "CHAT_MESSAGE" | "WORKOUT_REMINDER";

export type NotificationSettingItems = {
  fcmToken: string
  workoutReminder: string
  chatMessage: string
}

export type NotificationSetting = {
  type: NotificationType;
  enabled: boolean;
}