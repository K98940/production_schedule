import type { MouseDownProps } from '@/components/TheElement.vue'
import { useCommonStore } from '@/store/common'

export const handleMouseDown = ({
  startX,
  startY,
  indexDevice,
  indexTask,
  idTask,
}: MouseDownProps) => {
  const common = useCommonStore()

  common.startX = startX
  common.startY = startY
  setTimeout(() => {
    if (common.indexActiveCard != -1) {
      common.idTask = idTask
    }
  }, 250)

  common.selectedDevice = indexDevice
  common.indexActiveCard = indexTask
}
