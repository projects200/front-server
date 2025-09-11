'use client'

import { useEffect, useRef } from 'react'
import ProfileImg from '../profileImg'

type ProfileImageFieldProps = {
  value: File | null
  defaultImageUrl: string | null
  onChange: (value: File | null) => void
}

export default function ProfileImageField({
  value,
  defaultImageUrl,
  onChange,
}: ProfileImageFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const newFile = value
  const previewUrl = newFile ? URL.createObjectURL(newFile) : null
  const displayImageUrl = previewUrl || defaultImageUrl

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onChange(file)
    }
    e.target.value = ''
  }

  return (
    <>
      <ProfileImg
        profileImageUrl={displayImageUrl}
        profileThumbnailUrl={null}
        mode="edit"
        onClick={handleImageClick}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  )
}
