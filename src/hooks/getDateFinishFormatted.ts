import { useCommonStore } from '@/store/common'

export const getDateFinishFormatted = (duration: number): string => {
  const common = useCommonStore()

  const dateFinish = new Date(common.newDate)
  const durationMinutes = duration / 60 / 1000
  dateFinish.setMinutes(dateFinish.getMinutes() + durationMinutes)

  const year = dateFinish.getFullYear()
  const month = dateFinish.getMonth()
  const day = dateFinish.getDate()

  const hour = dateFinish.getHours().toString().padStart(2, '0')
  const minutes = dateFinish.getMinutes().toString().padStart(2, '0')
  return `${day}.${month + 1}.${year}, ${hour}:${minutes}`
}
