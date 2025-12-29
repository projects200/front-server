'use client'

import Link from 'next/link'
import { format } from 'date-fns'

import { useReadUserFullProfile } from '@/hooks/api/useMypageApi'
import EditIcon from '@/assets/icon_edit.svg'
import SettingsIcon from '@/assets/icon_settings.svg'
import BottomNavigation from '@/components/commons/bottomNavigation'
import ProfileImg from '@/components/commons/profileImg'
import Typography from '@/components/ui/typography'
import ExerciseCalendar from '@/components/commons/exerciseCalendar/exerciseCalendar'
import { formatGenderToKR, formatDateToKR } from '@/utils/dataFormatting'
import SITE_MAP from '@/constants/siteMap.constant'

import PreferExerciseItem from './_components/preferExerciseItem'
import styles from './mypage.module.css'

import { useRemoteConfig } from '@/hooks/useRemoteConfig' //12월 17일 제거

export default function Mypage() {
  const todayString = format(new Date(), 'yyyy-MM-dd')
  const { data: profileData, isLoading: profileLoading } =
    useReadUserFullProfile()
  const { config, isLoading: remoteConfigIsLoading } = useRemoteConfig() //12월17일 제거

  if (profileLoading || !profileData || remoteConfigIsLoading) return null //12월17일 remoteConfigIsLoading 제거

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

      {/* 선호운동 영역 */}
      {/* 12월 17일 플래그 제거 */}
      {config.new_feautre_flag && (
        <section className={styles['prefer-exercise-section']}>
          <div className={styles['prefer-exercise-title']}>
            <Typography as="p" variant="content-large" weight="bold">
              선호 운동
            </Typography>
            <Link
              href={`${SITE_MAP.MYPAGE_PREFER_SELECT}?nickName=${profileData.nickname}`}
            >
              <EditIcon className={styles['prefer-exercise-edit-icon']} />
            </Link>
          </div>
          {profileData.preferredExercises.length > 0 ? (
            <div className={styles['prefer-exercise-list']}>
              {profileData.preferredExercises.map((data) => (
                <PreferExerciseItem
                  key={`prefer-${data.preferredExerciseId}`}
                  data={data}
                />
              ))}
            </div>
          ) : (
            <Link
              href={`${SITE_MAP.MYPAGE_PREFER_SELECT}?nickName=${profileData.nickname}`}
              className={styles['prefer-exercise-create']}
            >
              <Typography as="p" variant="content-large" weight="bold">
                선호운동을 선택해주세요 +
              </Typography>
            </Link>
          )}
        </section>
      )}

      {/* 달력 영역 */}
      <section className={styles['calender-section']}>
        <ExerciseCalendar selectedDate={todayString} isReadOnly={true} />
      </section>

      {/* 바텀 네비게이션 영역 */}
      <BottomNavigation />
    </>
  )
}
