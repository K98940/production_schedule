import { leftPadding } from '@/constants/constants'
import { updateTaskDates } from '@/hooks/updateTaskDates'
import { useCommonStore } from '@/store/common'
import { useDataStore } from '@/store/data'

const ANIMATION_DURATION = 500

export const handleMouseUp = () => {
  const common = useCommonStore()
  const data = useDataStore()

  const POSITION_OFFSET = 9 // коррекция положения по оси Х

  if (
    common.indexActiveCard != -1 &&
    common.isIntersecting &&
    common.indexIntersectingCard != null
  ) {
    const { selectedDevice, indexActiveCard, indexIntersectingCard } = common
    const activeTask = data.tasks[selectedDevice]?.[indexActiveCard]
    const passiveTask = data.tasks[selectedDevice]?.[indexIntersectingCard]

    if (!activeTask || !passiveTask) {
      resetDragState(common)
      return
    }

    const activeStart = new Date(activeTask.dateStartISO).getTime()
    const passiveStart = new Date(passiveTask.dateStartISO).getTime()
    const shiftDirection = getDirection(activeStart, passiveStart, passiveTask.duration)

    const container = document.getElementById('calendar-container')
    const containerScrollLeft = container?.scrollLeft ?? 0

    const passiveElement = document.getElementById(`${passiveTask.id}`)
    const activeElement = document.getElementById(`${activeTask.id}`)
    const passiveRect = passiveElement?.getBoundingClientRect()
    const activeRect = activeElement?.getBoundingClientRect()

    if (passiveRect && activeRect) {
      common.newDate = new Date(
        shiftDirection === 'right'
          ? passiveStart + passiveTask.duration
          : passiveStart - activeTask.duration,
      )

      common.newCoordX =
        (shiftDirection === 'right'
          ? passiveRect.right
          : passiveRect.left - activeRect.width - POSITION_OFFSET) +
        containerScrollLeft -
        leftPadding
    }

    if (activeElement) {
      animateElement(activeElement)
    }

    updateTaskDates(common, data, activeTask)
    resetDragState(common)
  }

  resetDragState(common)
}

const getDirection = (
  activeStart: number,
  passiveStart: number,
  passiveDuration: number,
): 'left' | 'right' => {
  const pivot = passiveStart + passiveDuration / 2

  return activeStart >= pivot ? 'right' : 'left'
}

const resetDragState = (common: ReturnType<typeof useCommonStore>) => {
  common.indexActiveCard = -1
  common.isIntersecting = false
  common.idTask = -1
  common.selectedDevice = null
}

const animateElement = (element: HTMLElement) => {
  element.style.transition = 'transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  setTimeout(() => {
    element.style.transition = 'none'
  }, ANIMATION_DURATION)
}
