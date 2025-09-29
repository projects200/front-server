import { ExerciseLocationId, ExerciseLocation } from '@/types/exerciseLocation'
import {
  ExerciseLocationIdDto,
  ExerciseLocationDto,
} from '@/types/dto/exerciseLocation.dto'

export function adapterExerciseLocationFormToDto(
  form: ExerciseLocation,
): ExerciseLocationDto {
  return {
    name: form.name,
    address: form.address,
    latitude: form.latitude,
    longitude: form.longitude,
  }
}

export function adapterExerciseLocation(
  dto: ExerciseLocationIdDto & ExerciseLocationDto,
): ExerciseLocationId & ExerciseLocation {
  return {
    id: dto.id,
    name: dto.name,
    address: dto.address,
    latitude: dto.latitude,
    longitude: dto.longitude,
  }
}

export function adapterExerciseLocationList(
  dtoList: (ExerciseLocationIdDto & ExerciseLocationDto)[],
): (ExerciseLocationId & ExerciseLocation)[] {
  return dtoList.map((dto) => adapterExerciseLocation(dto))
}
