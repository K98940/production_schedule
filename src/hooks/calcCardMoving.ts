import { widthCalendarAside } from '@/constants/constants'
import { useCalendarStore } from '@/store/calendar'
import { useCommonStore } from '@/store/common'

export const calcCardMoving = (e: MouseEvent) => {
  const common = useCommonStore()
  const calendar = useCalendarStore()

  common.coordMouseX = e.clientX - widthCalendarAside
  common.coordX = e.clientX - widthCalendarAside
  common.newDate = new Date(
    (calendar.intervalStart || 0) +
      ((common.newCoordX - widthCalendarAside) / calendar.pixelsPerMinute) * 60 * 1000,
  )
}
