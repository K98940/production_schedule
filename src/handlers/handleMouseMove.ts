import { calcCardMoving } from '@/hooks/calcCardMoving'
import { useCommonStore } from '@/store/common'
import { useDataStore, type Task } from '@/store/data'
import { updateTaskDates } from '../hooks/updateTaskDates'

export const handleMouseMove = (e: MouseEvent) => {
  const common = useCommonStore()
  const data = useDataStore()

  if (common.indexActiveCard == -1) return

  common.newCoordX = e.clientX - common.startX
  calcCardMoving(e)

  // Получаем текущую задачу и список задач для устройства
  const currentDeviceTasks = data.tasks[common.selectedDevice]
  const activeTask = currentDeviceTasks[common.indexActiveCard]

  // Проверяем пересечения временных интервалов
  const intersectionResult = checkTimeIntersections(currentDeviceTasks, activeTask)
  common.isIntersecting = intersectionResult.hasIntersection
  common.indexIntersectingCard = intersectionResult.intersectedIndex

  // Обновляем даты задачи
  updateTaskDates(common, data, activeTask)
}

/**
 * Проверяет пересечения временных интервалов текущей задачи с другими
 * Возвращает объект с информацией о пересечениях
 */
export const checkTimeIntersections = (
  tasks: Task[],
  activeTask: Task,
): {
  hasIntersection: boolean
  intersectedIndex: number | null
} => {
  const activeStart = new Date(activeTask.dateStartISO).getTime()
  const activeEnd = new Date(activeTask.dateEndISO).getTime()

  let intersectedIndex: number | null = null

  const hasIntersection = tasks.some((passiveTask, index) => {
    if (passiveTask.id === activeTask.id) return false

    const passiveStart = new Date(passiveTask.dateStartISO).getTime()
    const passiveEnd = new Date(passiveTask.dateEndISO).getTime()

    const isIntersecting = activeEnd > passiveStart && activeStart < passiveEnd

    if (isIntersecting && intersectedIndex === null) {
      intersectedIndex = index
    }

    return isIntersecting
  })

  return {
    hasIntersection,
    intersectedIndex,
  }
}
