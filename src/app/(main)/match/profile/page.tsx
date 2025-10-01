'use client'

import { useQueryState } from 'nuqs'
import { format } from 'date-fns'

import Header from '@/components/commons/header'
import { useReadOtherUserFullProfile } from '@/hooks/api/useMypageApi'
import { useReadMemberChatroomUrl } from '@/hooks/api/useOpenChatApi'
import ProfileImg from '@/components/commons/profileImg'
import Typography from '@/components/ui/typography'
import ExerciseCalendar from '@/components/commons/exerciseCalendar/exerciseCalendar'
import { formatGenderToKR, formatDateToKR } from '@/utils/dataFormatting'

import styles from './profile.module.css'

export default function Profile() {
  const [memberId] = useQueryState('memberId')
  // chatroomUrl이 필수로 존재한다는 비즈니스 로직이 필요함(체크 필요)

  const { data: chatroomUrl, isLoading: chatroomLoading } =
    useReadMemberChatroomUrl(memberId!)
  const { data: profileData, isLoading: profileLoading } =
    useReadOtherUserFullProfile(memberId!)
  const todayString = format(new Date(), 'yyyy-MM-dd')

  if (profileLoading || chatroomLoading || !profileData) return null

  return (
    <>
      <Header>{''}</Header>

      {/* 프로필 영역 */}
      <section className={styles['profile-section']}>
        <ProfileImg
          profileThumbnailUrl={profileData.profileThumbnailUrl}
          profileImageUrl={profileData.profileImageUrl}
          mode="view"
        />

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
            {profileData.bio}
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
        <button className={styles['open-chat-button']}>
          <Typography as="p" variant="content-medium">
            {chatroomUrl?.chatroomUrl}
          </Typography>
        </button>
      </section>

      {/* 선호운동 영역 */}
      {/* <section className={styles['prefer-exercise-section']}>
        선호운동 예정
      </section> */}

      {/* 달력 영역 */}
      <section className={styles['calender-section']}>
        <ExerciseCalendar
          selectedDate={todayString}
          isReadOnly={true}
          isOthers={true}
        />
      </section>
    </>
  )
}
