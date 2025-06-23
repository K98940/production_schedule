import type { Task } from '@/store/data'
import { heightCalendarRow, heightCalendarTitle } from '@/constants/constants'
import { devices } from '@/constants/devices'

/** Проверка пересечения временных интервалов */
const isOverlap = (start: Date, end: Date, tasks: Task[]): boolean => {
  return tasks.some((t) => {
    const s = new Date(t.dateStartISO)
    const e = new Date(t.dateEndISO)
    if (s.toDateString() !== start.toDateString()) return false // другой день
    return start < e && end > s
  })
}

/**
 * Генерация мок-задач без пересечений во времени на одном устройстве.
 * На каждый день создаётся 5-15 карточек (но не более 15/день).
 */
export function generateMockTasks(dateStart: Date, dateFinish: Date): Task[][] {
  if (!dateStart || !dateFinish) return []

  const start = new Date(dateStart)
  start.setHours(0, 0, 0, 0)
  const finish = new Date(dateFinish)
  finish.setHours(0, 0, 0, 0)

  const dayCount = Math.floor((finish.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) + 1
  const deviceIDs = Object.keys(devices)

  const tasksByDevice: Record<string, Task[]> = {}
  let idCounter = 1

  for (let dayIndex = 0; dayIndex < dayCount; dayIndex++) {
    const currentDay = new Date(start)
    currentDay.setDate(start.getDate() + dayIndex)

    const tasksPerDay = 5 + Math.floor(Math.random() * 11) // 5-15
    let createdForDay = 0
    let attempts = 0

    while (createdForDay < tasksPerDay && attempts < tasksPerDay * 50) {
      attempts++

      const deviceID = deviceIDs[Math.floor(Math.random() * deviceIDs.length)]
      const deviceTitle = devices[deviceID]

      // стартовое время: 08:00-21:30 (чтобы 3-часовая задача уложилась в день)
      const startHour = 8 + Math.floor(Math.random() * 14) // 8-21
      const startMinute = Math.random() < 0.5 ? 0 : 30

      const taskStart = new Date(currentDay)
      taskStart.setHours(startHour, startMinute, 0, 0)

      const durationHours = 1 + Math.floor(Math.random() * 3) // 1-3
      const taskEnd = new Date(taskStart)
      taskEnd.setHours(taskEnd.getHours() + durationHours)

      // ограничиваем окончание рабочим днём 22:00
      if (taskEnd.getHours() > 22 || (taskEnd.getHours() === 22 && taskEnd.getMinutes() > 0)) {
        continue
      }

      // Проверка пересечений на устройстве
      const existing = tasksByDevice[deviceID] || []
      if (isOverlap(taskStart, taskEnd, existing)) {
        continue // попытка неудачна
      }

      const idValue = idCounter++
      const task: Task = {
        id: idValue,
        dateStartISO: taskStart.toISOString(),
        dateEndISO: taskEnd.toISOString(),
        duration: taskEnd.getTime() - taskStart.getTime(),
        coordX: 0,
        coordY: 0,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: `Мок-операция #${idValue}`,
        deviceID,
        deviceTitle,
      }

      tasksByDevice[deviceID] = existing.concat(task)
      createdForDay++
    }
  }

  // Формируем структуру Task[][] и координату Y
  const groupedTasks: Task[][] = []
  const orderedDeviceIDs = Object.keys(tasksByDevice).sort((a, b) => Number(a) - Number(b))

  orderedDeviceIDs.forEach((deviceID, indexDevice) => {
    const deviceTasks = tasksByDevice[deviceID]
    deviceTasks.forEach((t) => {
      t.coordY = heightCalendarTitle + heightCalendarRow * indexDevice + 3
    })
    groupedTasks.push(deviceTasks)
  })

  return groupedTasks
}
