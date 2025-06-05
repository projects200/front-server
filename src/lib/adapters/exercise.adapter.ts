import {
  ExerciseContentReqDto,
  ExerciseRecordResDto,
} from '@/types/dto/exercise'
import { ExerciseContent, ExerciseRecordRes } from '@/types/exercise'

export function adaptExerciseContent(
  dto: ExerciseContent,
): ExerciseContentReqDto {
  return {
    exerciseTitle: dto.title,
    exercisePersonalType: dto.category || '',
    exerciseLocation: dto.location || '',
    exerciseDetail: dto.content || '',
    exerciseStartedAt: dto.startedAt,
    exerciseEndedAt: dto.endedAt,
  }
}

export function adaptExerciseRecord(
  dto: ExerciseRecordResDto,
): ExerciseRecordRes {
  return {
    title: dto.exerciseTitle,
    category: dto.exercisePersonalType || '',
    location: dto.exerciseLocation || '',
    content: dto.exerciseDetail || '',
    startedAt: dto.exerciseStartedAt,
    endedAt: dto.exerciseEndedAt,
    images: dto.pictureDataList ?? [],
  }
}
