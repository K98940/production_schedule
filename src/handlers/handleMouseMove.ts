import { useCommonStore } from '@/store/common'
import { useDataStore } from '@/store/data'

export const handleMouseMove = (e: MouseEvent) => {
  const common = useCommonStore()
  const data = useDataStore()

  if (common.indexActiveElement == -1) return

  let newCoordX = e.clientX - common.startX

  const borderWidth = 4
  const leftElement = data.tasks[common.selectedDevice][common.indexActiveElement - 1] || null
  const rightElement = data.tasks[common.selectedDevice][common.indexActiveElement + 1] || null
  const leftBoundary = leftElement ? leftElement.coordX + leftElement.width + borderWidth : -9999
  const rightBoundary = rightElement
    ? rightElement.coordX -
      data.tasks[common.selectedDevice][common.indexActiveElement].width -
      borderWidth
    : 9999

  if (newCoordX < leftBoundary) {
    newCoordX = leftBoundary + 1
  }
  if (newCoordX > rightBoundary) {
    newCoordX = rightBoundary - 1
  }

  data.tasks[common.selectedDevice][common.indexActiveElement] = {
    ...data.tasks[common.selectedDevice][common.indexActiveElement],
    coordX: newCoordX,
  }
}
