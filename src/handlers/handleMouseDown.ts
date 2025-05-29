import { useCommonStore } from '@/store/common'
import { useDataStore } from '@/store/data'

export const handleMouseDown = (id, x, y) => {
  const common = useCommonStore()
  const data = useDataStore()

  common.indexActiveElement = data.tasks.findIndex((el) => el.id == id)
  common.startX = x
  common.startY = y
}
