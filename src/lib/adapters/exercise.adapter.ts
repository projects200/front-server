import {
  ExerciseRangeResDto,
  ExerciseListResDto,
  ExerciseRecordResDto,
  ExerciseContentReqDto,
} from '@/types/dto/exercise'
import {
  ExerciseRange,
  ExerciseList,
  ExerciseContent,
  ExerciseRecordRes,
} from '@/types/exercise'

export function adaptExerciseRange(
  dtoArray: ExerciseRangeResDto[],
): ExerciseRange[] {
  return dtoArray.map((dto) => ({
    date: dto.date,
    record: dto.exerciseCount,
  }))
}

export function adaptExerciseList(
  dtoArray: ExerciseListResDto[],
): ExerciseList[] {
  return dtoArray.map((dto) => ({
    exerciseId: dto.exerciseId,
    title: dto.exerciseTitle,
    category: dto.exercisePersonalType || '',
    startedAt: dto.exerciseStartedAt,
    endedAt: dto.exerciseEndedAt,
    images: dto.pictureUrl ?? [],
  }))
}

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
