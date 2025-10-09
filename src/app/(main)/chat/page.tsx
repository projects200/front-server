'use client'

import Link from 'next/link'

import { formatChatTime } from '@/utils/dataFormatting'
import LogoTitle from '@/components/ui/logoTitle'
import ProfileImg from '@/components/commons/profileImg'
import BottomNavigation from '@/components/commons/bottomNavigation'
import Typography from '@/components/ui/typography'
import SITE_MAP from '@/constants/siteMap.constant'

import styles from './chat.module.css'

import { TEMP_DATA } from './tempData'

export default function Chat() {
  return (
    <div className={styles['container']}>
      <LogoTitle />
      {TEMP_DATA.length > 0 ? (
        TEMP_DATA.map((data, index) => (
          <Link
            href={`${SITE_MAP.CHAT_ROOM}`}
            key={`${data.otherMemberNickname}-${index}`}
            className={styles['list-container']}
          >
            <ProfileImg
              className={styles['profile-img']}
              profileImageUrl={data.otherMemberProfileImageUrl}
              profileThumbnailUrl={data.otherMemberThumbnailImageUrl}
              mode="view"
            />
            <div className={styles['text-section']}>
              <div className={styles['text-top-section']}>
                <Typography as="p" variant="content-large" weight="bold">
                  {data.otherMemberNickname}
                </Typography>
                <Typography
                  className={styles['time']}
                  as="p"
                  variant="content-small"
                >
                  {formatChatTime(data.lastChatSendedAt)}
                </Typography>
              </div>
              <div className={styles['text-bottom-section']}>
                <Typography
                  className={styles['last-text']}
                  as="p"
                  variant="content-medium"
                >
                  {data.lastChatContent}
                </Typography>
                {data.unreadCount !== 0 && (
                  <div className={styles['badge']}>
                    <Typography as="p" variant="content-small">
                      {data.unreadCount}
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div>(임시)채팅방이 없습니다.</div>
      )}
      <BottomNavigation />
    </div>
  )
}
