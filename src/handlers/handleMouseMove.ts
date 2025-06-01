import { calcCardMoving } from '@/hooks/calcCardMoving'
import { useCommonStore } from '@/store/common'
import { useDataStore } from '@/store/data'

export const handleMouseMove = (e: MouseEvent) => {
  const common = useCommonStore()
  const data = useDataStore()

  if (common.indexActiveElement == -1) return

  common.newCoordX = e.clientX - common.startX

  const borderWidth = 4
  const leftElement = data.tasks[common.selectedDevice][common.indexActiveElement - 1] || null
  const rightElement = data.tasks[common.selectedDevice][common.indexActiveElement + 1] || null
  const leftBoundary = leftElement ? leftElement.coordX + leftElement.width + borderWidth : -9999
  const rightBoundary = rightElement
    ? rightElement.coordX -
      data.tasks[common.selectedDevice][common.indexActiveElement].width -
      borderWidth
    : 9999

  if (common.newCoordX < leftBoundary) {
    common.newCoordX = leftBoundary + 1
  }
  if (common.newCoordX > rightBoundary) {
    common.newCoordX = rightBoundary - 1
  }

  calcCardMoving(e)

  data.tasks[common.selectedDevice][common.indexActiveElement] = {
    ...data.tasks[common.selectedDevice][common.indexActiveElement],
    coordX: common.newCoordX,
  }
}
