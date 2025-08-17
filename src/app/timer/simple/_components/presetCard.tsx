'use client'

import { useState, useRef, useEffect } from 'react'
import { mutate } from 'swr'

import { usePatchSimpleTimer } from '@/hooks/useTimerApi'
import KebabIcon from '@/assets/icon_kebab.svg'
import { formatNumberToTime } from '@/utils/timer'
import Typography from '@/components/ui/typography'
import { SimpleTimer } from '@/types/timer'
import { useToast } from '@/hooks/useToast'

import TimerPicker from '../../_components/timePicker'
import KebabModal from './kebabModal'
import styles from './presetCard.module.css'

type Props = {
  preset: SimpleTimer
  onPresetClick: (seconds: number) => void
}

export default function PresetCard({ preset, onPresetClick }: Props) {
  const { trigger: timerUpdate } = usePatchSimpleTimer()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const showToast = useToast()

  const handleKebabClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMenuOpen(true)
  }

  const handleOnEdit = () => {
    setIsTimePickerOpen(true)
  }
  const handleOnDelete = (preset: SimpleTimer) => {
    alert(`삭제기능 미구현 ${preset.simpleTimerId}`)
  }

  const handleEditComplete = async (editedTime: number) => {
    if (editedTime === 0) {
      showToast('0초는 선택할 수 없습니다.', 'info')
      return
    }

    try {
      await timerUpdate({
        simpleTimerId: preset.simpleTimerId,
        time: editedTime,
      })
      await mutate(['timer/simple/list'])
    } catch {}
  }

  // 메뉴 외부를 클릭하면 닫히도록 하는 로직
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuRef])

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

      <div ref={menuRef} className={styles['kebab-container']}>
        <button className={styles['kebab-button']} onClick={handleKebabClick}>
          <KebabIcon className={styles['kebab-icon']} />
        </button>
        {isMenuOpen && (
          <KebabModal
            onEdit={() => {
              handleOnEdit()
              setIsMenuOpen(false)
            }}
            onDelete={() => {
              handleOnDelete(preset)
              setIsMenuOpen(false)
            }}
          />
        )}
      </div>

      {isTimePickerOpen && (
        <TimerPicker
          preset={preset}
          onClose={() => setIsTimePickerOpen(false)}
          onComplete={handleEditComplete}
        />
      )}
    </div>
  )
}
