import { describe, it, expect } from 'vitest'
import { generateMockTasks } from '../generateMockTasks'

const flatten = <T>(arr: T[][]): T[] => arr.reduce((acc, val) => acc.concat(val), [])

/** Возвращает yyyy-mm-dd строку для Date (без часового пояса) */
const getDateKey = (d: Date): string => {
  return d.toISOString().substring(0, 10)
}

describe('generateMockTasks', () => {
  it('создаёт 5-15 задач для одного дня', () => {
    const date = new Date('2025-06-23')
    const tasks = generateMockTasks(date, date)

    const allTasks = flatten(tasks)

    // Количество в пределах 5-15
    expect(allTasks.length).toBeGreaterThanOrEqual(5)
    expect(allTasks.length).toBeLessThanOrEqual(15)
  })

  it('создаёт корректное количество задач для диапазона дней', () => {
    const start = new Date('2025-06-23')
    const finish = new Date('2025-06-25') // 3 дня

    const tasks = generateMockTasks(start, finish)
    const allTasks = flatten(tasks)

    const dayCount = 3
    const min = 5 * dayCount
    const max = 15 * dayCount

    expect(allTasks.length).toBeGreaterThanOrEqual(min)
    expect(allTasks.length).toBeLessThanOrEqual(max)
  })

  it('время задач не пересекается на одном устройстве в один день', () => {
    const date = new Date('2025-06-23')
    const tasksByDevice = generateMockTasks(date, date)

    tasksByDevice.forEach((deviceTasks) => {
      // группируем по дню
      const map: Record<string, typeof deviceTasks> = {}
      deviceTasks.forEach((t) => {
        const key = getDateKey(new Date(t.dateStartISO))
        map[key] = map[key] || []
        map[key].push(t)
      })

      Object.values(map).forEach((tasksInDay) => {
        // сортируем по времени начала
        tasksInDay.sort((a, b) => new Date(a.dateStartISO).getTime() - new Date(b.dateStartISO).getTime())
        for (let i = 0; i < tasksInDay.length - 1; i++) {
          const currentEnd = new Date(tasksInDay[i].dateEndISO).getTime()
          const nextStart = new Date(tasksInDay[i + 1].dateStartISO).getTime()
          expect(currentEnd).toBeLessThanOrEqual(nextStart)
        }
      })
    })
  })

  it('duration задачи равен разнице между start и end', () => {
    const date = new Date('2025-06-23')
    const tasks = flatten(generateMockTasks(date, date))

    tasks.forEach((t) => {
      const duration = new Date(t.dateEndISO).getTime() - new Date(t.dateStartISO).getTime()
      expect(duration).toBe(t.duration)
      expect(duration).toBeGreaterThan(0)
    })
  })
})
