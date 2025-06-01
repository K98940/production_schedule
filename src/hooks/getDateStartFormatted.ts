import { useCommonStore } from '@/store/common'

export const getDateStartFormatted = (): string => {
  const common = useCommonStore()

  const year = common.newDate.getFullYear()
  const month = common.newDate.getMonth()
  const day = common.newDate.getDate()

  const hour = common.newDate.getHours().toString().padStart(2, '0')
  const minutes = common.newDate.getMinutes().toString().padStart(2, '0')
  return `${day}.${month + 1}.${year}, ${hour}:${minutes}`
}
