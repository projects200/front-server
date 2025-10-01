'use client'

import Header from '@/components/commons/header'
import BottomButton from '@/components/commons/bottomButton'
import { useToast } from '@/hooks/useToast'
import { usePostChatroomUrl } from '@/hooks/api/useOpenChatApi'

import styles from './openChat.module.css'

export default function OpenChat() {
  const { trigger: createChatroomUrl } = usePostChatroomUrl()
  const showToast = useToast()

  const handleSubmit = async () => {
    try {
      await createChatroomUrl({
        chatroomUrl: 'https://open.kakao.com/o/ssiMNPUh',
      })
      showToast('카카오 오픈 채팅 링크가 생성되었습니다.')
    } catch {}
  }

  return (
    <div className={styles['container']}>
      <Header>카카오 오픈 채팅</Header>
      <button onClick={handleSubmit}>test</button>
      <BottomButton>완료</BottomButton>
    </div>
  )
}
