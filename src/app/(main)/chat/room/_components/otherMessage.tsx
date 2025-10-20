import { memo } from 'react'
import clsx from 'clsx'

import ProfileImg from '@/components/commons/profileImg'
import Typography from '@/components/ui/typography'
import { ChatContent } from '@/types/chat'
import { formatChatTime } from '@/utils/dataFormatting'

import styles from './message.module.css'

type Props = {
  chat: ChatContent
  isContinuous: boolean
  shouldShowTime: boolean
}

function OtherMessage({ chat, isContinuous, shouldShowTime }: Props) {
  return (
    <div
      className={clsx(
        styles['other-message-container'],
        isContinuous && styles['continuous-container'],
      )}
    >
      <div
        className={clsx(
          styles['profile-img-wrapper'],
          isContinuous && styles.hidden,
        )}
      >
        {!isContinuous && (
          <ProfileImg
            className={styles['profile-img']}
            profileImageUrl={chat.senderProfileUrl}
            profileThumbnailUrl={chat.senderThumbnailUrl}
            mode="view"
          />
        )}
      </div>
      <div className={styles['bubble-wrapper']}>
        <Typography
          className={clsx(styles['bubble'], styles['other-bubble'])}
          as="p"
          variant="content-large"
        >
          {chat.chatContent}
        </Typography>
        {shouldShowTime && (
          <Typography className={styles['time']} as="p" variant="content-small">
            {formatChatTime(chat.sentAt)}
          </Typography>
        )}
      </div>
    </div>
  )
}

export default memo(OtherMessage)
