'use client'

import Header from '@/components/commons/header'
import { ExerciseRecordReq } from '@/types/exercise'

import ExerciseForm from '../_components/exerciseForm'
// import styles from './edit.module.css'

export default function Create() {
  const handleSubmit = (values: ExerciseRecordReq) => {
    console.log('자식에서 받은 값:', values)
    //운동기록 수정 api 연결
  }
  return (
    <>
      <Header>운동 기록 수정</Header>
      <ExerciseForm
        // 전달받은 데이터 넣어주기
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
