/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCommonStore } from '@/store/common'
import { useDataStore, type Task } from '@/store/data'
import { useCalendarStore } from '@/store/calendar'
import { updateTaskDates } from '@/hooks/updateTaskDates'
import { getISODateFormatted } from '@/hooks/getISODateFormatted'

const prefixDate = '2025-05-30T'
const suffix = ':00.000'

// helper для создания задачи
const createTask = (id: number, startHour: string, endHour: string): Task => {
  return {
    id,
    dateStartISO: `${prefixDate}${startHour}${suffix}`,
    dateEndISO: `${prefixDate}${endHour}${suffix}`,
    duration:
      new Date(`${prefixDate}${endHour}${suffix}`).getTime() -
      new Date(`${prefixDate}${startHour}${suffix}`).getTime(),
    coordX: 0,
    coordY: 0,
    nextId: 0,
    width: 0,
    height: 0,
    title: 'test',
    deviceID: '1',
    deviceTitle: 'device',
  }
}

describe('updateTaskDates', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('updates task dates and writes to store', () => {
    const calendar = useCalendarStore()
    // установить границы дня
    calendar.setDateStart('2025-05-30')
    calendar.setDateFinish('2025-05-30')

    const data = useDataStore()
    const common = useCommonStore()

    const task = createTask(1, '08:00', '10:00')
    data.tasks = [[task]]

    // подготовить состояние для функции
    common.selectedDevice = 0 as any
    common.indexActiveCard = 0 as any

    // «переместим» задачу на 09:00
    const newDate = new Date(`${prefixDate}09:00${suffix}`)
    common.newDate = newDate as any

    const updated = updateTaskDates(common as any, data as any, task)

    expect(updated).not.toBeNull()
    if (updated) {
      // дата старта должна совпадать с newDate
      expect(updated.dateStartISO).toBe(getISODateFormatted(newDate))
      // дата окончания = старт + duration
      expect(
        new Date(updated.dateEndISO).getTime() - new Date(updated.dateStartISO).getTime(),
      ).toBe(task.duration)
      // запись в хранилище изменилась
      expect(data.tasks[0][0].dateStartISO).toBe(updated.dateStartISO)
    }
  })

  it('returns null if indices invalid', () => {
    const data = useDataStore()
    const common = useCommonStore()

    const task = createTask(1, '08:00', '10:00')

    // не добавляем task в store -> индексы будут невалидны
    common.selectedDevice = 0 as any
    common.indexActiveCard = 0 as any
    const result = updateTaskDates(common as any, data as any, task)
    expect(result).toBeNull()
  })
})
