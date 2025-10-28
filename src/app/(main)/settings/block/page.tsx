'use client'

import Header from '@/components/commons/header'
import ProfileImg from '@/components/commons/profileImg'
import Typography from '@/components/ui/typography'
import {
  useReadBlockMemberList,
  useDeleteBlockMember,
} from '@/hooks/api/useBlockApi'

import styles from './block.module.css'

export default function Block() {
  const { data } = useReadBlockMemberList()
  const { trigger: deleteBlockMember } = useDeleteBlockMember()

  const handleUnblock = async (memberId: string) => {
    try {
      await deleteBlockMember({
        memberId: memberId,
      })
    } catch {}
  }

  if (!data) return null

  return (
    <div className={styles['container']}>
      <Header>차단된 계정</Header>
      {data.length > 0 ? (
        data.map((data, index) => (
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
