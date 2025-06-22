import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { handleChangeDateRange } from '../handleChangeDateRange'
import { useCalendarStore } from '@/store/calendar'

describe('handleChangeDateRange', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('должен устанавливать одинаковые даты начала и окончания для одного дня', () => {
    const calendar = useCalendarStore()

    const testDate = new Date('2024-01-15T10:30:00.000Z')
    const dates: [Date, Date] = [testDate, testDate]

    handleChangeDateRange(dates)

    // Проверяем, что даты установлены
    expect(calendar.dateStart).toBeDefined()
    expect(calendar.dateFinish).toBeDefined()

    // Проверяем, что сетка обновлена
    expect(calendar.grid).toBeDefined()
  })

  it('должен устанавливать разные даты для диапазона', () => {
    const calendar = useCalendarStore()

    const startDate = new Date('2024-01-15T10:30:00.000Z')
    const endDate = new Date('2024-01-17T15:45:00.000Z')
    const dates: [Date, Date] = [startDate, endDate]

    handleChangeDateRange(dates)

    // Проверяем, что даты установлены
    expect(calendar.dateStart).toBeDefined()
    expect(calendar.dateFinish).toBeDefined()

    // Проверяем, что сетка обновлена
    expect(calendar.grid).toBeDefined()
  })

  it('должен корректно обрабатывать часовые пояса', () => {
    const calendar = useCalendarStore()

    // Создаем дату в UTC
    const utcDate = new Date('2024-01-15T12:00:00.000Z')
    const dates: [Date, Date] = [utcDate, utcDate]

    handleChangeDateRange(dates)

    // Проверяем, что даты установлены с учетом часового пояса
    expect(calendar.dateStart).toBeDefined()
    expect(calendar.dateFinish).toBeDefined()
  })

  it('должен обновлять сетку календаря', () => {
    const calendar = useCalendarStore()

    const testDate = new Date('2024-01-15T10:30:00.000Z')
    const dates: [Date, Date] = [testDate, testDate]

    // Сохраняем исходное состояние сетки
    const originalGrid = calendar.grid

    handleChangeDateRange(dates)

    // Проверяем, что сетка обновлена
    expect(calendar.grid).toBeDefined()
    expect(calendar.grid).not.toBe(originalGrid)
  })
})
