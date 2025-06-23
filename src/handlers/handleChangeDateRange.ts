import { useCalendarStore } from '@/store/calendar'
import { useDataStore } from '@/store/data'
import { generateMockTasks } from '@/hooks/generateMockTasks'

export const handleChangeDateRange = (dates: [Date?, Date?]) => {
  const calendar = useCalendarStore()
  const data = useDataStore()
  const [startRaw, finishRaw] = dates

  const offsetTimeZone = startRaw
    ? -startRaw.getTimezoneOffset() / 60
    : finishRaw
      ? -finishRaw.getTimezoneOffset() / 60
      : 0

  if (startRaw) {
    const dateStart = new Date(startRaw)
    dateStart.setHours(dateStart.getHours() + offsetTimeZone)
    calendar.setDateStart(dateStart.toISOString().replace('Z', ''))
  }

  if (finishRaw) {
    const dateFinish = new Date(finishRaw)
    dateFinish.setHours(dateFinish.getHours() + offsetTimeZone)
    calendar.setDateFinish(dateFinish.toISOString().replace('Z', ''))
  }

  calendar.grid = calendar.getGridData

  // генерируем новые задачи в зависимости от обновлённого диапазона дат
  data.tasks = generateMockTasks(calendar.dateStart, calendar.dateFinish)
  data.calculateCoord()
}
