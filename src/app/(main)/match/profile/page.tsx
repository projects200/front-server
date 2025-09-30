'use client'

import { useQueryState } from 'nuqs'
import { format } from 'date-fns'

import Header from '@/components/commons/header'
import { useReadOtherUserFullProfile } from '@/hooks/api/useMypageApi'
import ProfileImg from '@/components/commons/profileImg'
import Typography from '@/components/ui/typography'
import ExerciseCalendar from '@/components/commons/exerciseCalendar/exerciseCalendar'
import { formatGenderToKR, formatDateToKR } from '@/utils/dataFormatting'

import styles from './profile.module.css'

export default function Profile() {
  const [memberId] = useQueryState('memberId')
  const { data: profileData, isLoading } = useReadOtherUserFullProfile(
    memberId!,
  )
  const todayString = format(new Date(), 'yyyy-MM-dd')

  if (isLoading || !profileData) return null

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
