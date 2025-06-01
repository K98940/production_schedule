import { useCommonStore } from '@/store/common'
import { getDateFormatted } from './getDateFormatted'
import { getTimeFormatted } from './getTimeFormatted'

export const getDateStartFormatted = (): string => {
  const common = useCommonStore()
  return `${getDateFormatted(common.newDate)}, ${getTimeFormatted(common.newDate)}`
}
