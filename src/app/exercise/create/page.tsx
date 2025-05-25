'use client'

import { Exercise } from '@/types/exercise'
import Header from '@/components/commons/header'
import ProtectedRoute from '@/components/commons/protectedRoute'

import ExerciseForm from '../components/exerciseForm'

export default function Create() {
  const handleSubmit = (values: Exercise) => {
    console.log('자식에서 받은 값:', values)
    //운동기록 생성 api 연결
  }
  return (
    <ProtectedRoute>
      <Header title="운동 기록하기" titleAlign="center" />
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
    </ProtectedRoute>
  )
}
