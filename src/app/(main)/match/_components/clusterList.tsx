import { useRouter } from 'next/navigation'

import Typography from '@/components/ui/typography'
import { MemberLocationFlattened } from '@/types/member'
import ProfileImg from '@/components/commons/profileImg'
import SITE_MAP from '@/constants/siteMap.constant'
import { formatGenderToKR, formatDateToKR } from '@/utils/dataFormatting'

import styles from './clusterList.module.css'

type Props = {
  members: MemberLocationFlattened[]
}

export default function ClusterList({ members }: Props) {
  const router = useRouter()

  const handleButton = (member: MemberLocationFlattened) => {
    router.replace(
      `${SITE_MAP.MATCH_PROFILE}?memberId=${member.memberId}&lat=${member.location.latitude}&lng=${member.location.longitude}`,
    )
  }

  return (
    <ul className={styles['member-list']}>
      {members.map((member, index) => (
        <li
          key={`${member.memberId}-${index}`}
          className={styles['member-item']}
        >
          <ProfileImg
            className={styles['profile-image']}
            profileThumbnailUrl={member.profileThumbnailUrl}
            profileImageUrl={member.profileImageUrl}
            mode="view"
          />
          <button
            className={styles['member-info']}
            onClick={() => {
              handleButton(member)
            }}
          >
            <Typography as="p" variant="content-large" weight="bold">
              {member.nickname}
            </Typography>
            <Typography as="p" variant="content-medium">
              {formatGenderToKR(member.gender)} |{' '}
              {formatDateToKR(member.birthDate)}
            </Typography>
            <Typography as="p" variant="content-medium">
              {member.location.exerciseLocationName}
            </Typography>
          </button>
        </li>
      ))}
    </ul>
  )
}
