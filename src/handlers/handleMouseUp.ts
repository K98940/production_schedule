import { useCommonStore } from '@/store/common'

export const handleMouseUp = () => {
  const common = useCommonStore()

  common.indexActiveElement = -1
  common.selectedDevice = null
}
