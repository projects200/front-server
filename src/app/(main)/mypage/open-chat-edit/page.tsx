'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'

import InfoIcon from '@/assets/icon_warning.svg'
import Description from '@/assets/temp_create_chat-url-description.svg'
import Header from '@/components/commons/header'
import BottomButton from '@/components/commons/bottomButton'
import { useToast } from '@/hooks/useToast'
// import { usePatchChatroomUrl } from '@/hooks/api/useOpenChatApi'
import Typography from '@/components/ui/typography'
import SITE_MAP from '@/constants/siteMap.constant'

import OpenChatForm, {
  OpenChatUrlFormHandle,
  OpenChatUrl,
} from '../../_components/openChatForm'
import styles from './openChatEdit.module.css'

export default function OpenChatEdit() {
  // const { trigger: patchChatroomUrl } = usePatchChatroomUrl()
  const showToast = useToast()
  const router = useRouter()
  const formRef = useRef<OpenChatUrlFormHandle>(null)

  const triggerFormSubmit = () => {
    formRef.current?.submit()
  }

  const handleSubmit = async (value: OpenChatUrl) => {
    alert(value)
    // try {
    //   await patchChatroomUrl({
    //     chatroomId: openChatroomId,
    //     chatroomUrl: value.openChatUrl,
    //   })
    //   showToast('카카오 오픈 채팅 링크가 수정되었습니다.')
    router.replace(SITE_MAP.MYPAGE)
    // } catch {}
  }

  return (
    <div className={styles['container']}>
      <Header>카카오 오픈 채팅</Header>

      <section className={styles['form-section']}>
        <OpenChatForm
          ref={formRef}
          defaultValues={{ openChatUrl: '' }}
          onSubmit={handleSubmit}
          onError={(message) => showToast(message, 'info')}
        />
      </section>

      <section className={styles['description-section']}>
        <Typography as="h2" variant="content-medium" weight="bold">
          카카오톡 오픈채팅방 만드는 법
        </Typography>
        <Description className={styles['description']} />
      </section>
      <section className={styles['info-section']}>
        <div className={styles['info-title']}>
          <InfoIcon className={styles['info-icon']} />
          <Typography as="span" variant="content-small" weight="bold">
            등록하신 카카오 오픈채팅 URL은 다른 이용자에게 공개됩니다.
          </Typography>
        </div>
        <Typography
          as="span"
          variant="content-small"
          className={styles['info-margin']}
        >
          회원님이 등록하는 오픈채팅 URL 정보는
          <br /> 운동 메이트와 연결하기 위한 목적으로 다른 이용자들에게
          공개됩니다.
        </Typography>
        <div className={styles['info-content']}>
          <Typography as="span" variant="content-small">
            - 제공받는 자: 본 서비스를 이용하는 다른 모든 회원
          </Typography>
          <Typography as="span" variant="content-small">
            - 제공하는 정보: 회원님이 등록한 오픈채팅 URL 정보
          </Typography>
          <Typography as="span" variant="content-small">
            - 보유 및 이용 기간: 회원 탈퇴 또는 해당 URL 정보 삭제 시까지
          </Typography>
        </div>
      </section>

      <BottomButton onClick={triggerFormSubmit}>완료</BottomButton>
    </div>
  )
}
