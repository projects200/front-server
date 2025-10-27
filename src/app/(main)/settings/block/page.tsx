'use client'

import Header from '@/components/commons/header'
import ProfileImg from '@/components/commons/profileImg'
import Typography from '@/components/ui/typography'

import styles from './block.module.css'

const TEMP_DATA = [
  {
    memberBlockId: 1,
    memberId: 'uuid-blocked-member-1',
    nickname: '차단된사용자닉네임1',
    profileImageUrl: null,
    blockedAt: '2023-10-27T14:30:00',
  },
  {
    memberBlockId: 2,
    memberId: 'uuid-blocked-member-2',
    nickname: '차단된사용자닉네임2',
    profileImageUrl: null,
    blockedAt: '2023-10-26T11:00:00',
  },
]

export default function Block() {
  const handleUnblock = async (memberId: string) => {
    alert(`${memberId} : 차단 해제`)
  }

  return (
    <div className={styles['container']}>
      <Header>차단된 계정</Header>
      {TEMP_DATA.length > 0 ? (
        TEMP_DATA.map((data, index) => (
          <div
            key={`${data.nickname}-${index}`}
            className={styles['list-container']}
          >
            <ProfileImg
              className={styles['profile-img']}
              profileImageUrl={data.profileImageUrl}
              profileThumbnailUrl={null}
              mode="view"
            />
            <Typography as="p" variant="content-large" weight="bold">
              {data.nickname}
            </Typography>
            <button
              className={styles['button']}
              onClick={() => handleUnblock(data.memberId)}
            >
              <Typography as="p" variant="content-medium" weight="bold">
                차단 해제
              </Typography>
            </button>
          </div>
        ))
      ) : (
        <div className={styles['empty']}>
          <Typography as="p" variant="content-large">
            아직 차단된 계정이 없어요
          </Typography>
        </div>
      )}
    </div>
  )
}
