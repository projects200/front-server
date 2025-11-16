import { NotificationSetting, NotificationSettingItems } from '@/types/fcm'
import {
  NotificationSettingDto,
  NotificationSettingItemsDto,
} from '@/types/dto/fcm.dto'

function adapterNotificationSettingToDto(
  data: NotificationSetting,
): NotificationSettingDto {
  return {
    type: data.type,
    enabled: data.enabled,
  }
}

export function adapterNotificationSettingListToDtoList(
  dataList: NotificationSetting[],
): NotificationSettingDto[] {
  return dataList.map((data) => adapterNotificationSettingToDto(data))
}

export function adapterNotificationSettingItems(
  dto: NotificationSettingItemsDto,
): NotificationSettingItems {
  return {
    fcmToken: dto.fcmToken,
    workoutReminder: dto.workoutReminder,
    chatMessage: dto.chatMessage,
  }
}

function adapterNotificationSetting(
  dto: NotificationSettingDto,
): NotificationSetting {
  return {
    type: dto.type,
    enabled: dto.enabled,
  }
}

export function adapterNotificationSettingList(
  dtoList: NotificationSettingDto[],
): NotificationSetting[] {
  return dtoList.map((dto) => adapterNotificationSetting(dto))
}
