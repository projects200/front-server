'use client'

import { useState } from 'react'
import { useQueryState } from 'nuqs'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

import KebabIcon from '@/assets/icon_kebab.svg'
import Header from '@/components/commons/header'
import BottomButton from '@/components/commons/bottomButton'
import { useReadOtherUserFullProfile } from '@/hooks/api/useMypageApi'
import { usePostChatRoom } from '@/hooks/api/useChatApi'
import ProfileImg from '@/components/commons/profileImg'
import Typography from '@/components/ui/typography'
import ExerciseCalendar from '@/components/commons/exerciseCalendar/exerciseCalendar'
import { formatGenderToKR, formatDateToKR } from '@/utils/dataFormatting'
import SITE_MAP from '@/constants/siteMap.constant'

import KebabModal from './_components/kebabModal'
import styles from './profile.module.css'

export default function Profile() {
  const router = useRouter()
  const [memberId] = useQueryState('memberId')
  const [lat] = useQueryState('lat')
  const [lng] = useQueryState('lng')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { trigger: createChatRoom } = usePostChatRoom()
  const { data: profileData, isLoading: profileLoading } =
    useReadOtherUserFullProfile(memberId!)
  const todayString = format(new Date(), 'yyyy-MM-dd')

  const handleBlock = async () => {
    alert('차단')
  }

  const handleBottomButton = async () => {
    if (!memberId || !profileData) return
    try {
      const res = await createChatRoom({
        receiverId: memberId,
      })
      router.push(
        `${SITE_MAP.CHAT_ROOM}?nickName=${profileData.nickname}&chatRoomId=${res.data.chatRoomId}`,
      )
    } catch {}
  }

  const menuRef = (node: HTMLDivElement) => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!node.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }

  if (profileLoading || !profileData) return null

  return (
    <>
      <Header
        onBack={() => {
          router.replace(`${SITE_MAP.MATCH}?lat=${lat}&lng=${lng}`)
        }}
        rightIcon={<KebabIcon />}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {''}
      </Header>

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

      {/* 바텀 버튼 */}
      <BottomButton
        className={styles['bottom-button']}
        onClick={handleBottomButton}
      >
        1:1 채팅하기
      </BottomButton>

      {/* 케밥 버튼 */}
      {isMenuOpen && (
        <KebabModal
          ref={menuRef}
          onBlock={() => {
            handleBlock()
            setIsMenuOpen(false)
          }}
        />
      )}
    </>
  )
}
