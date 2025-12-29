'use client'

import PreferSelectForm from './_components/preferSelectForm'

import {
  useReadExerciseTypeList,
  useReadPreferredExerciseList,
} from '@/hooks/api/useMypageApi'

export default function PreferSelect() {
  const { data: exerciseItemList, isLoading: exerciseItemListLoading } =
    useReadExerciseTypeList()
  const { data: myPreferredExercise, isLoading: myPreferredExerciseLoading } =
    useReadPreferredExerciseList()

  if (
    !exerciseItemList ||
    !myPreferredExercise ||
    exerciseItemListLoading ||
    myPreferredExerciseLoading
  )
    return null

  return (
    <PreferSelectForm
      exerciseItemList={exerciseItemList}
      initialPreferredExercise={myPreferredExercise}
    />
  )
}
