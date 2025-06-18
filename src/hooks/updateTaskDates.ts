import { getISODateFormatted } from '@/hooks/getISODateFormatted'
import type { useCommonStore } from '@/store/common'
import type { useDataStore, Task } from '@/store/data'
import { useCalendarStore } from '@/store/calendar'

/**
 * Обновляет даты и координаты активной задачи
 */
export const updateTaskDates = (
  common: ReturnType<typeof useCommonStore>,
  data: ReturnType<typeof useDataStore>,
  activeTask: Task,
) => {
  const newDate = new Date(common.newDate)
  const newDateStart = getISODateFormatted(newDate)
  const newDateStartMsec = newDate.getTime()
  const newDateEndMsec = newDateStartMsec + activeTask.duration
  const newDateFinish = getISODateFormatted(new Date(newDateEndMsec))

  const calendar = useCalendarStore()

  // Проверяем, что индексы устройства и задачи валидны
  const deviceIdx = common.selectedDevice
  const taskIdx = common.indexActiveCard

  if (
    deviceIdx == null ||
    deviceIdx < 0 ||
    deviceIdx >= data.tasks.length ||
    taskIdx < 0 ||
    taskIdx >= data.tasks[deviceIdx].length
  ) {
    console.warn('updateTaskDates: invalid indices', 'deviceIdx', deviceIdx, 'taskIdx', taskIdx)
    return null
  }

  // Создаем обновленную задачу
  const updatedTask: Task = {
    ...activeTask,
    dateStartISO: newDateStart,
    dateEndISO: newDateFinish,
    coordX: calendar.getX(newDateStartMsec),
  }

  // Обновляем задачу в хранилище через $patch, чтобы сохранить реактивность
  data.$patch((state) => {
    ;(state.tasks[deviceIdx] as Task[])[taskIdx] = updatedTask
  })

  return updatedTask
}
