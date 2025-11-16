import clsx from 'clsx'
import { useRouter } from 'next/navigation'

import { useChatAlertContext } from '@/context/chatAlertContext'
import AppLogo from '@/assets/app_icon_circle.svg'
import Typography from '@/components/ui/typography'
import SITE_MAP from '@/constants/siteMap.constant'

import styles from './chatAlert.module.css'

const ChatAlert = () => {
  const { chatAlert } = useChatAlertContext()
  const router = useRouter()

  if (!chatAlert) return null

  const handleChatAlertClick = () => {
    const { chatRoomId, memberId, nickname } = chatAlert.payload.data
    if (chatRoomId) {
      router.push(
        `${SITE_MAP.CHAT_ROOM}?chatRoomId=${chatRoomId}&nickName=${nickname}&memberId=${memberId}`,
      )
    }
  }

  return (
    <button
      key={chatAlert.id}
      className={clsx(
        styles['alert-container'],
        !chatAlert.isVisible && styles['disappearing'],
      )}
      onClick={handleChatAlertClick}
    >
      <AppLogo className={styles['logo']} />
      <div className={styles['text-container']}>
        <Typography
          className={styles['nickname']}
          as="p"
          variant="content-medium"
          weight="bold"
        >
          {chatAlert.payload.data.nickname}
        </Typography>
        <Typography
          className={styles['content']}
          as="p"
          variant="content-medium"
        >
          {chatAlert.payload.data.content}
        </Typography>
      </div>
    </button>
  )
}

export default ChatAlert
