import clsx from 'clsx'

import { formatChatTime } from '@/utils/dataFormatting'
import { Message } from '@/types/chat'
import Typography from '@/components/ui/typography'

import styles from './message.module.css'



type Props = {
  chat: Message
  isContinuous: boolean
  shouldShowTime: boolean
}

export default function MyMessage({
  chat,
  isContinuous,
  shouldShowTime,
}: Props) {
  return (
    <div
      className={clsx(
        styles['my-message-container'],
        isContinuous && styles['continuous-container'],
      )}
    >
      <div className={styles['bubble-wrapper']}>
        {shouldShowTime && (
          <Typography className={styles['time']} as="p" variant="content-small">
            {formatChatTime(chat.sentAt)}
          </Typography>
        )}
        <Typography
          className={clsx(styles['bubble'], styles['my-bubble'])}
          as="p"
          variant="content-large"
        >
          {chat.chatContent}
        </Typography>
      </div>
    </div>
  )
}
