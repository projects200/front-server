'use client'

import { ExerciseFormValues } from '@/types/exercise'
import Header from '@/components/commons/header'

import ExerciseForm from '../_components/exerciseForm'

export default function Create() {
  const handleSubmit = (values: ExerciseFormValues) => {
    console.log('자식에서 받은 값:', values)
    //운동기록 생성 api 연결
  }
  return (
    <>
      <Header>운동 기록하기</Header>
      <ExerciseForm
        defaultValues={{
          title: '',
          category: '',
          location: '',
          startedAt: '',
          endedAt: '',
          content: '',
          images: [],
        }}
        onSubmit={handleSubmit}
      />
    </>
  )
}
