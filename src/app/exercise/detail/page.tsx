'use client'

import { useState } from 'react'

import Header from '@/components/commons/header'
import KebabIcon from '@/assets/icon_kebab.svg'

import InputField from '../_components/inputField'
import TextareaField from '../_components/textareaField'
import TimeSelect from '../_components/dateTimePicker'
import ImageField from './_components/imageField'
import KebabModal from './_components/kebabModal'
import styles from './detail.module.css'

export default function Detail() {
  const [isBottomModalOpen, setIsBottomModalOpen] = useState(false)

  return (
    <>
      <Header
        rightIcon={<KebabIcon className={styles['header-icon']} />}
        onClick={() => setIsBottomModalOpen(true)}
      >
        기록 상세
      </Header>
      <ImageField />
      <InputField value="데이터 연결" label="제목" id="title" readonly={true} />
      <InputField
        value="데이터 연결"
        label="운동 종류"
        id="category"
        readonly={true}
      />
      <TimeSelect
        label="운동 시간"
        startedAt={''}
        endedAt={''}
        readonly={true}
      />
      <InputField value="데이터 연결" label="장소" id="title" readonly={true} />
      <TextareaField
        className={styles['text-field']}
        value="데이터 연결"
        label="내용"
        id="title"
        readonly={true}
      />
      <KebabModal isOpen={isBottomModalOpen} setIsOpen={setIsBottomModalOpen} />
    </>
  )
}
