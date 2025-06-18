import { useCalendarStore } from '@/store/calendar'
import type { Task } from '@/store/data'

/**
 * Возвращает координату X и ширину для задачи исходя из настроек календаря
 */
export const calcTaskPosition = (
  task: Pick<Task, 'dateStartISO' | 'duration'>,
): { coordX: number; width: number } => {
  const calendar = useCalendarStore()
  const startTime = new Date(task.dateStartISO).getTime()
  return {
    coordX: calendar.getX(startTime),
    width: calendar.getWidth(task.duration),
  }
}
