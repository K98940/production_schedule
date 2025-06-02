import { calcCardMoving } from '@/hooks/calcCardMoving'
import { getISODateFormatted } from '@/hooks/getISODateFormatted'
import { useCommonStore } from '@/store/common'
import { useDataStore, type Task } from '@/store/data'

export const handleMouseMove = (e: MouseEvent) => {
  const common = useCommonStore()
  const data = useDataStore()

  if (common.indexActiveElement == -1) return

  common.newCoordX = e.clientX - common.startX
  calcCardMoving(e)

  // Получаем текущую задачу и список задач для устройства
  const currentDeviceTasks = data.tasks[common.selectedDevice]
  const activeTask = currentDeviceTasks[common.indexActiveElement]

  // Проверяем пересечения временных интервалов
  common.isIntersecting = checkTimeIntersections(currentDeviceTasks, activeTask)

  // Обновляем даты задачи
  updateTaskDates(common, data, activeTask)
}

/**
 * Проверяет пересечения временных интервалов текущей задачи с другими
 */
const checkTimeIntersections = (tasks: Task[], activeTask: Task): boolean => {
  const activeStart = new Date(activeTask.dateStartISO).getTime()
  const activeEnd = new Date(activeTask.dateEndISO).getTime()

  return tasks.some((passiveTask) => {
    if (passiveTask.id === activeTask.id) return false

    const passiveStart = new Date(passiveTask.dateStartISO).getTime()
    const passiveEnd = new Date(passiveTask.dateEndISO).getTime()

    return activeEnd >= passiveStart && activeStart <= passiveEnd
  })
}

/**
 * Обновляет даты и координаты активной задачи
 */
const updateTaskDates = (
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
  data.tasks[common.selectedDevice][common.indexActiveElement] = updatedTask
}
