import { getISODateFormatted } from '@/hooks/getISODateFormatted'
import type { useCommonStore } from '@/store/common'
import type { useDataStore, Task } from '@/store/data'

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

  // Создаем обновленную задачу
  const updatedTask: Task = {
    ...activeTask,
    dateStartISO: newDateStart,
    dateEndISO: newDateFinish,
    coordX: common.newCoordX,
  }

  // Обновляем задачу в хранилище
  data.tasks[common.selectedDevice][common.indexActiveCard] = updatedTask
}
