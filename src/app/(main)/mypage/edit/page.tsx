'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'

import { useReadUserFullProfile } from '@/hooks/useMypageApi'
import { useToast } from '@/hooks/useToast'
import Header from '@/components/commons/header'
import CompleteButton from '@/components/commons/completeButton'
import ProfileEditForm, {
  ProfileEditFormHandle,
  ProfileEditFormValues,
} from '@/components/commons/profileForm/profileEditForm'

import styles from './edit.module.css'

export default function Edit() {
  const router = useRouter()
  const showToast = useToast()
  const formRef = useRef<ProfileEditFormHandle>(null)
  const { data: profileData, isLoading } = useReadUserFullProfile()

  const triggerFormSubmit = () => {
    formRef.current?.submit()
  }
  const handleSubmit = async (value: ProfileEditFormValues) => {
    try {
      console.log(value)
      alert('프로필 수정 완료')
      router.back()
    } catch {
      return
    }
  }

  if (isLoading || !profileData) return null

  return (
    <div className={styles['page-container']}>
      <Header rightIcon={<CompleteButton />} onClick={triggerFormSubmit}>
        프로필 수정
      </Header>

      <ProfileEditForm
        ref={formRef}
        defaultValues={{
          profileImageUrl:
            profileData.profileThumbnailUrl ||
            profileData.profileImageUrl ||
            null,
          nickname: profileData.nickname,
          gender: profileData.gender,
          bio: profileData.bio || '',
        }}
        onSubmit={handleSubmit}
        onError={(message) => showToast(message, 'info')}
      />
      {profileData.bio}
    </div>
  )
}
