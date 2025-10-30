'use client'

import { useState } from 'react'
import { useQueryState } from 'nuqs'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

import Button from '@/components/ui/button'
import CenterDialog from '@/components/ui/CenterDialog'
import KebabIcon from '@/assets/icon_kebab.svg'
import Header from '@/components/commons/header'
import BottomButton from '@/components/commons/bottomButton'
import { useReadOtherUserFullProfile } from '@/hooks/api/useMypageApi'
import { usePostChatRoom } from '@/hooks/api/useChatApi'
import { usePostBlockMember } from '@/hooks/api/useBlockApi'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { trigger: createChatRoom } = usePostChatRoom()
  const { trigger: createBlockMember } = usePostBlockMember()
  const { data: profileData, isLoading: profileLoading } =
    useReadOtherUserFullProfile(memberId!)
  const todayString = format(new Date(), 'yyyy-MM-dd')

  const handleBlock = async () => {
    if (!memberId) return
    try {
      await createBlockMember({
        memberId: memberId,
      })
      router.back()
    } catch {}
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
            setIsDialogOpen(true)
            setIsMenuOpen(false)
          }}
        />
      )}

      {/* 차단 다이어로그 */}
      {isDialogOpen && (
        <CenterDialog>
          <Typography as="p" variant="content-large" weight="bold">
            회원 차단
          </Typography>
          <Typography
            className={styles['dialog-content']}
            as="p"
            variant="content-small"
          >
            차단하면 차단한 회원이 보내는 메세지를 받을 수 없습니다. 또한, 매칭
            지도에서 차단한 회원을 조회할 수 없습니다.
          </Typography>
          <div className={styles['dialog-button-group']}>
            <Button
              className={styles['dialog-button']}
              variant="secondary"
              onClick={() => setIsDialogOpen(false)}
            >
              취소
            </Button>
            <Button
              className={styles['dialog-button']}
              variant="warning"
              onClick={() => handleBlock()}
            >
              차단
            </Button>
          </div>
        </CenterDialog>
      )}
    </>
  )
}
