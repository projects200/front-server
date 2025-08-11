import { CustomTimer, CustomTimerList } from '@/types/timer'
import { CustomTimerDto, CustomTimerListDto } from '@/types/dto/timer'

export function adapterCustomTimer(dto: CustomTimerDto): CustomTimer {
  return {
    customTimerId: dto.customTimerId,
    customTimerName: dto.customTimerName,
  }
}

export function adapterCustomTimerList(
  dto: CustomTimerListDto,
): CustomTimerList {
  return {
    customTimerList: dto.customTimerList.map(adapterCustomTimer),
  }
}
