'use client'

import { useState, useRef, useCallback } from 'react'
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
  const menuRef = useRef<(event: MouseEvent) => void>(null)
  const menuCallbackRef = useCallback((node: HTMLDivElement | null) => {
    if (menuRef.current) {
      document.removeEventListener('mousedown', menuRef.current)
    }

    menuRef.current = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (node) {
      document.addEventListener('mousedown', menuRef.current)
    }
  }, [])

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

      <div ref={menuCallbackRef} className={styles['kebab-container']}>
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
