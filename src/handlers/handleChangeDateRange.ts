import { useCalendarStore } from '@/store/calendar'
import { useDataStore } from '@/store/data'

export const handleChangeDateRange = (dates: Date[]) => {
  const calendar = useCalendarStore()
  const data = useDataStore()

  const offsetTimeZone = dates[0]
    ? -dates[0].getTimezoneOffset() / 60
    : dates[1]
      ? -dates[1].getTimezoneOffset() / 60
      : 0

  const dateStart: Date = dates[0] as Date
  dateStart?.setHours(dateStart.getHours() + offsetTimeZone)
  const start = dateStart?.toISOString().replace('Z', '')
  calendar.setDateStart(start)

  if (dates[1]) {
    const dateFinish: Date = dates[1] as Date
    dateFinish.setHours(dateFinish.getHours() + offsetTimeZone)
    const finish = dateFinish.toISOString().replace('Z', '')
    calendar.setDateFinish(finish)
  }

  calendar.grid = calendar.getGridData
  data.calculateCoord()
}
