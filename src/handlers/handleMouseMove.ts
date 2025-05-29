import { useCommonStore } from '@/store/common'
import { useDataStore } from '@/store/data'

export const handleMouseMove = (e: MouseEvent) => {
  const common = useCommonStore()
  const data = useDataStore()

  if (common.indexActiveElement == -1) return

  const targetElement = data.tasks[common.indexActiveElement]
  let newCoordX = e.clientX - common.startX

  const borderWidth = 4
  const leftElement = data.tasks[common.indexActiveElement - 1] || null
  const rightElement = data.tasks[common.indexActiveElement + 1] || null
  const leftBoundary = leftElement ? leftElement.coordX + leftElement.width + borderWidth : -9999
  const rightBoundary = rightElement
    ? rightElement.coordX - targetElement.width - borderWidth
    : 9999

  if (newCoordX < leftBoundary) {
    newCoordX = leftBoundary + 1
  }
  if (newCoordX > rightBoundary) {
    newCoordX = rightBoundary - 1
  }

  data.tasks[common.indexActiveElement] = {
    ...data.tasks[common.indexActiveElement],
    coordX: newCoordX,
  }
}
