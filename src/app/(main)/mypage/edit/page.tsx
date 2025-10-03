'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'

import {
  useReadUserFullProfile,
  usePutUserProfile,
} from '@/hooks/api/useMypageApi'
import { usePostProfilePicture } from '@/hooks/api/useProfileApi'
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
  const { trigger: putUserProfile } = usePutUserProfile()
  const { trigger: postProfilePicture } = usePostProfilePicture()

  if (isLoading || !profileData) return null

  const triggerFormSubmit = () => {
    formRef.current?.submit()
  }

  const handleSubmit = async (values: ProfileEditFormValues) => {
    try {
      await putUserProfile({
        nickname: values.nickname,
        gender: values.gender,
        bio: values.bio,
      })
    } catch {
      return
    }
    if (values.profileImage) {
      try {
        await postProfilePicture({
          profilePicture: values.profileImage,
        })
      } catch {}
    }
    router.back()
  }

  return (
    <div className={styles['page-container']}>
      <Header
        rightIcon={<CompleteButton>완료</CompleteButton>}
        onClick={triggerFormSubmit}
      >
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
    </div>
  )
}
