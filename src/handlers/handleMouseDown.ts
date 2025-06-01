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
  common.idTask = idTask

  common.selectedDevice = indexDevice
  common.indexActiveElement = indexTask
}
