import { useCalendarStore } from '@/store/calendar'
import { useDataStore } from '@/store/data'
import { Ref } from 'vue'

export const handleChangeDateRange = (dates: Ref<Date[], Date[]>) => {
  const calendar = useCalendarStore()
  const data = useDataStore()

  const offsetTimeZone = dates.value[0]
    ? -dates.value[0].getTimezoneOffset() / 60
    : dates.value[1]
      ? -dates.value[1].getTimezoneOffset() / 60
      : 0

  const dateStart: Date = dates.value[0] as Date
  dateStart?.setHours(dateStart.getHours() + offsetTimeZone)
  const start = dateStart?.toISOString().replace('Z', '')
  calendar.setDateStart(start)

  if (dates.value[1]) {
    const dateFinish: Date = dates.value[1] as Date
    dateFinish.setHours(dateFinish.getHours() + offsetTimeZone)
    const finish = dateFinish.toISOString().replace('Z', '')
    calendar.setDateFinish(finish)
  }

  calendar.grid = calendar.getGridData
  data.calculateCoord()
}
