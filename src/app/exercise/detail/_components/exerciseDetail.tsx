import { ExerciseRecordRes } from '@/types/exercise'

import InputField from '../../_components/inputField'
import TextareaField from '../../_components/textareaField'
import DateTimePicker from '../../_components/dateTimePicker'
import ImageField from './imageField'
import styles from './exerciseDetail.module.css'

export default function ExerciseDetail(data: ExerciseRecordRes) {
  return (
    <>
      <ImageField />
      <InputField value={data.title} label="제목" id="title" readonly={true} />
      <InputField
        value={data.category || ''}
        label="운동 종류"
        id="category"
        readonly={true}
      />
      <DateTimePicker
        label="운동 시간"
        startedAt={data.startedAt}
        endedAt={data.endedAt}
        readonly={true}
      />
      <InputField
        value={data.location || ''}
        label="장소"
        id="location"
        readonly={true}
      />
      <TextareaField
        className={styles['text-field']}
        value={data.content || ''}
        label="내용"
        id="content"
        readonly={true}
      />
    </>
  )
}
