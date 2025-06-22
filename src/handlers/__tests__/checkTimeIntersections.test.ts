import { describe, it, expect } from 'vitest'
import { checkTimeIntersections } from '@/handlers/handleMouseMove'
import type { Task } from '@/store/data'

// Вспомогательная функция для упрощённого создания задач
const createTask = (id: number, startISO: string, endISO: string): Task => {
  return {
    id,
    dateStartISO: startISO,
    dateEndISO: endISO,
    duration: new Date(endISO).getTime() - new Date(startISO).getTime(),
    coordX: 0,
    coordY: 0,
    nextId: 0,
    width: 0,
    height: 0,
    title: `Task ${id}`,
    deviceID: 'device-1',
    deviceTitle: 'Device 1',
  }
}

describe('checkTimeIntersections', () => {
  it('должен возвращать false, когда пересечений нет', () => {
    const tasks = [
      createTask(1, '2023-01-01T00:00:00.000Z', '2023-01-01T01:00:00.000Z'),
      createTask(2, '2023-01-01T01:00:00.000Z', '2023-01-01T02:00:00.000Z'),
    ]

    const result = checkTimeIntersections(tasks, tasks[0])
    expect(result).toEqual({ hasIntersection: false, intersectedIndex: null })
  })

  it('должен обнаруживать пересечение и возвращать индекс пересекающейся задачи', () => {
    const tasks = [
      createTask(1, '2023-01-01T00:00:00.000Z', '2023-01-01T01:30:00.000Z'),
      createTask(2, '2023-01-01T01:00:00.000Z', '2023-01-01T02:00:00.000Z'),
    ]

    const result = checkTimeIntersections(tasks, tasks[0])
    expect(result).toEqual({ hasIntersection: true, intersectedIndex: 1 })
  })

  it('граница без пересечения (конец одной задачи равен началу другой) не считается пересечением', () => {
    const tasks = [
      createTask(1, '2023-01-01T00:00:00.000Z', '2023-01-01T01:00:00.000Z'),
      createTask(2, '2023-01-01T01:00:00.000Z', '2023-01-01T02:00:00.000Z'),
    ]

    const result = checkTimeIntersections(tasks, tasks[1])
    expect(result).toEqual({ hasIntersection: false, intersectedIndex: null })
  })
})
