'use client'

import Link from 'next/link'
import { format } from 'date-fns'

import { useReadUserFullProfile } from '@/hooks/api/useMypageApi'
import {
  useReadChatroomUrl,
  useReadMemberChatroomUrl,
} from '@/hooks/api/useOpenChatApi'
import EditIcon from '@/assets/icon_edit.svg'
import SettingsIcon from '@/assets/icon_settings.svg'
import BottomNavigation from '@/components/commons/bottomNavigation'
import ProfileImg from '@/components/commons/profileImg'
import Typography from '@/components/ui/typography'
import ExerciseCalendar from '@/components/commons/exerciseCalendar/exerciseCalendar'
import { formatGenderToKR, formatDateToKR } from '@/utils/dataFormatting'
import SITE_MAP from '@/constants/siteMap.constant'

import styles from './mypage.module.css'

export default function Mypage() {
  const todayString = format(new Date(), 'yyyy-MM-dd')
  const { data: chatroomUrl, isLoading: chatroomLoading } = useReadChatroomUrl()
  const { data: profileData, isLoading: profileLoading } =
    useReadUserFullProfile()

  const { data: testData, isLoading: testLoading } = useReadMemberChatroomUrl(
    '84386d2c-9041-7054-8c8c-a5d5a4eff628',
  )

  // if (profileLoading || chatroomLoading || !profileData) return null
  if (profileLoading || chatroomLoading || !profileData || testLoading)
    return null

  console.log(testData)

  return (
    <>
      {/* 헤더영역 */}
      <section className={styles['header-section']}>
        <Link href={SITE_MAP.MYPAGE_EDIT}>
          <EditIcon className={styles['header-icon']} />
        </Link>
        <Link href={SITE_MAP.SETTINGS}>
          <SettingsIcon className={styles['header-icon']} />
        </Link>
      </section>

      {/* 프로필 영역 */}
      <section className={styles['profile-section']}>
        {profileData.profileImageUrl === null ? (
          <ProfileImg
            profileThumbnailUrl={profileData.profileThumbnailUrl}
            profileImageUrl={profileData.profileImageUrl}
            mode="view"
          />
        ) : (
          <Link href={SITE_MAP.MYPAGE_PICTURES}>
            <ProfileImg
              profileThumbnailUrl={profileData.profileThumbnailUrl}
              profileImageUrl={profileData.profileImageUrl}
              mode="view"
            />
          </Link>
        )}

        <Typography
          className={styles['nickname']}
          as="span"
          variant="title-medium"
          weight="bold"
        >
          {profileData.nickname}
        </Typography>
        <Typography
          className={styles['birth']}
          as="span"
          variant="content-medium"
        >
          {formatGenderToKR(profileData.gender)} |{' '}
          {formatDateToKR(profileData.birthDate)}
        </Typography>
        <div className={styles['user-info']}>
          <div className={styles['info-item']}>
            <Typography as="span" variant="title-medium" weight="bold">
              {profileData.exerciseCountInLast30Days}
            </Typography>
            <Typography
              as="span"
              variant="content-small"
              className={styles['info-label']}
            >
              최근 30일 운동 횟수
            </Typography>
          </div>
          <div className={styles['info-item']}>
            <Typography
              as="span"
              variant="title-medium"
              weight="bold"
              className={styles['info-value-container']}
            >
              {profileData.yearlyExerciseDays}
              <span className={styles['info-value-suffix']}>/ 365</span>
            </Typography>
            <Typography
              as="span"
              variant="content-small"
              className={styles['info-label']}
            >
              올해 운동 일수
            </Typography>
          </div>
          <div className={styles['info-item']}>
            <Typography as="span" variant="title-medium" weight="bold">
              {profileData.exerciseScore}
            </Typography>
            <Typography
              as="span"
              variant="content-small"
              className={styles['info-label']}
            >
              운동 점수
            </Typography>
          </div>
        </div>
        <div className={styles['bio']}>
          <Typography as="span" variant="content-medium">
            {profileData.bio || '자기소개를 입력해서 자신에 대해 알려주세요!'}
          </Typography>
        </div>
      </section>

      {/* 오픈 채팅 링크 영역 */}
      <section className={styles['open-chat-section']}>
        <Typography as="p" variant="content-large" weight="bold">
          오픈 채팅 링크
        </Typography>
        <Typography
          className={styles['open-chat-sub-text']}
          as="p"
          variant="content-small"
        >
          채팅 기능이 개발 중입니다. 카카오 오픈 채팅을 사용해주세요!
        </Typography>
        {chatroomUrl ? (
          <>
            <button className={styles['open-chat-button']}>
              <Typography as="p" variant="content-medium">
                {chatroomUrl.chatroomUrl}
              </Typography>
            </button>
            <Link
              className={styles['open-chat-edit']}
              href={SITE_MAP.MYPAGE_OPEN_CHAT}
            >
              <EditIcon className={styles['open-chat-edit-icon']} />
            </Link>
          </>
        ) : (
          <Link
            className={styles['open-chat-link']}
            href={SITE_MAP.MYPAGE_OPEN_CHAT}
          >
            <Typography
              className={styles['open-chat-link-text']}
              as="p"
              variant="content-large"
              weight="bold"
            >
              카카오 오픈 채팅 URL을 추가해 주세요 +
            </Typography>
          </Link>
        )}
      </section>

      {/* 선호운동 영역 */}
      {/* <section className={styles['prefer-exercise-section']}>
        선호운동 예정
      </section> */}

      {/* 달력 영역 */}
      <section className={styles['calender-section']}>
        <ExerciseCalendar selectedDate={todayString} isReadOnly={true} />
      </section>

      {/* 바텀 네비게이션 영역 */}
      <BottomNavigation />
    </>
  )
}
