import { useRef, useEffect } from 'react'

import { useSprings, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

import StepItem from './stepItem'
import StepCreator from './stepCreator'
import { CustomTimerFormValues } from './customTimerForm'
import styles from './stepList.module.css'

const ITEM_HEIGHT = 60
const GAP = 12
const TOTAL_ITEM_HEIGHT = ITEM_HEIGHT + GAP

type Step = CustomTimerFormValues['steps'][number]

type StepListProps = {
  steps: Step[]
  onStepsChange: (newSteps: Step[]) => void
  onRemoveStep: (index: number) => void
  onTimeClick: (index: number) => void
  onAddStep: (name: string, time: number) => void
  newStepTime: number
}

const animation =
  (
    order: number[],
    steps: Step[],
    active = false,
    originalId = 0,
    curIndex = 0,
    y = 0,
  ) =>
  (index: number) => {
    const id = steps[index].id
    return active && id === originalId
      ? {
          y: curIndex * TOTAL_ITEM_HEIGHT + y,
          zIndex: 1,
          immediate: (n: string) => n === 'y' || n === 'zIndex',
        }
      : {
          y: order.indexOf(id) * TOTAL_ITEM_HEIGHT,
          zIndex: 0,
          immediate: false,
        }
  }

export default function StepList({
  steps,
  onStepsChange,
  onRemoveStep,
  onTimeClick,
  onAddStep,
  newStepTime,
}: StepListProps) {
  const order = useRef<number[]>(steps.map((step) => step.id))
  const isHandleActive = useRef(false)

  if (order.current.length !== steps.length) {
    order.current = steps.map((step) => step.id)
  }
  const [springs, api] = useSprings(
    steps.length,
    animation(order.current, steps),
    [steps],
  )
  useEffect(() => {
    api.start((i) => ({
      y: order.current.indexOf(steps[i].id) * TOTAL_ITEM_HEIGHT,
      immediate: true,
    }))
  }, [steps, api])

  const bind = useDrag(
    ({ args: [originalId], active, event, first, movement: [, y] }) => {
      if (first) {
        isHandleActive.current = !!(event.target as HTMLElement)?.closest(
          '[data-drag-handle="true"]',
        )
      }
      if (!isHandleActive.current) return

      const curIndex = order.current.indexOf(originalId)
      const curRow = Math.max(
        0,
        Math.min(
          steps.length - 1,
          Math.round((curIndex * TOTAL_ITEM_HEIGHT + y) / TOTAL_ITEM_HEIGHT),
        ),
      )

      const newOrder = [...order.current]
      const [movedId] = newOrder.splice(curIndex, 1)
      newOrder.splice(curRow, 0, movedId)

      api.start(animation(newOrder, steps, active, originalId, curIndex, y))

      if (!active) {
        order.current = newOrder
        const reorderedSteps = newOrder.map(
          (id) => steps.find((s) => s.id === id)!,
        )
        onStepsChange(reorderedSteps)
      }
    },
  )
  return (
    <>
      <div
        className={styles['step-list']}
        style={{
          height: steps.length > 0 ? steps.length * TOTAL_ITEM_HEIGHT - GAP : 0,
        }}
      >
        {steps.map((step, i) => (
          <animated.div
            {...bind(step.id)}
            key={step.id}
            style={{
              zIndex: springs[i].zIndex,
              transform: springs[i].y.to((y) => `translate3d(0,${y}px,0)`),
            }}
            className={styles['animated-step-item']}
          >
            <StepItem
              step={step}
              onNameChange={(newName) => {
                const newSteps = [...steps]
                newSteps[i].name = newName
                onStepsChange(newSteps)
              }}
              onTimeClick={() => onTimeClick(i)}
              onRemove={() => onRemoveStep(i)}
            />
          </animated.div>
        ))}
        {steps.length < 50 && (
          <div
            className={styles['step-creator']}
            style={{
              top:
                steps.length > 0 ? steps.length * TOTAL_ITEM_HEIGHT - GAP : 0,
              marginTop: steps.length === 0 ? 0 : 12,
            }}
          >
            <StepCreator
              onAdd={onAddStep}
              onTimeClick={() => onTimeClick(-1)}
              newStepTime={newStepTime}
            />
          </div>
        )}
      </div>
    </>
  )
}
