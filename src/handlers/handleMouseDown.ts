import { MouseDownProps } from '@/components/TheElement.vue'
import { useCommonStore } from '@/store/common'

export const handleMouseDown = ({ startX, startY, indexDevice, indexTask }: MouseDownProps) => {
  const common = useCommonStore()

  common.startX = startX
  common.startY = startY

  common.selectedDevice = indexDevice
  common.indexActiveElement = indexTask
}
