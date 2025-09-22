'use client'

import { useState } from 'react'

import { usePatchSimpleTimer, useDeleteSimpleTimer } from '@/hooks/api/useTimerApi'
import KebabIcon from '@/assets/icon_kebab.svg'
import { formatNumberToTime } from '@/utils/timer'
import Typography from '@/components/ui/typography'
import { SimpleTimer } from '@/types/timer'
import { useToast } from '@/hooks/useToast'

import TimePicker from '../../_components/timePicker'
import KebabModal from './kebabModal'
import styles from './presetCard.module.css'

type Props = {
  preset: SimpleTimer
  onPresetClick: (seconds: number) => void
  onUpdate: (updatedTimer: SimpleTimer) => void
  onDelete: (deletedTimerId: number) => void
}

export default function PresetCard({
  preset,
  onPresetClick,
  onUpdate,
  onDelete,
}: Props) {
  const { trigger: timerUpdate } = usePatchSimpleTimer()
  const { trigger: timerDelete } = useDeleteSimpleTimer()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false)
  const showToast = useToast()

  const handleKebabClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMenuOpen(true)
  }

  const handleOnEdit = () => {
    setIsTimePickerOpen(true)
  }
  const handleOnDelete = async (simpleTimerId: number) => {
    try {
      await timerDelete({ simpleTimerId: simpleTimerId })
      onDelete(simpleTimerId)
    } catch {}
  }

  const handleEditComplete = async (editedTime: number) => {
    if (editedTime === 0) {
      showToast('0초는 선택할 수 없습니다.', 'info')
      return
    }

    try {
      const updatedTimerData = {
        simpleTimerId: preset.simpleTimerId,
        time: editedTime,
      }
      await timerUpdate(updatedTimerData)
      onUpdate(updatedTimerData)
    } catch {}
  }

  // 메뉴 외부를 클릭하면 닫히도록 하는 로직
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

  return (
    <div className={styles['container']}>
      <button
        className={styles['timer-button']}
        onClick={() => onPresetClick(preset.time)}
      >
        <Typography as="span" variant="text22" weight="bold">
          {formatNumberToTime(preset.time)}
        </Typography>
      </button>

      <div className={styles['kebab-container']}>
        <button className={styles['kebab-button']} onClick={handleKebabClick}>
          <KebabIcon className={styles['kebab-icon']} />
        </button>
        {isMenuOpen && (
          <KebabModal
            ref={menuRef}
            onEdit={() => {
              handleOnEdit()
              setIsMenuOpen(false)
            }}
            onDelete={() => {
              handleOnDelete(preset.simpleTimerId)
              setIsMenuOpen(false)
            }}
          />
        )}
      </div>

      {isTimePickerOpen && (
        <TimePicker
          time={preset.time}
          onClose={() => setIsTimePickerOpen(false)}
          onComplete={handleEditComplete}
        />
      )}
    </div>
  )
}
