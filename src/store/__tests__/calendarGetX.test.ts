/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCalendarStore } from '@/store/calendar'
import { widthCalendarAside, widthStroke } from '@/constants/constants'

// Упрощённый расчёт минут и миллисекунд
const oneHour = 60 * 60 * 1000
const oneDay = 24 * oneHour

describe('calendar.getX', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const setupStore = () => {
    const calendar = useCalendarStore()

    const contextWidth = 1000
    const intervalStart = Date.parse('2025-05-30T00:00:00')

    // заполняем необходимые поля
    calendar.$patch({
      contextRect: { width: contextWidth } as any,
      intervalStart,
      countMiliseconds: oneDay,
    })

    return { calendar, contextWidth }
  }

  it('возвращает корректную координату для времени, совпадающего с intervalStart', () => {
    const { calendar } = setupStore()

    const x = calendar.getX(calendar.intervalStart as number)
    expect(x).toBe(widthCalendarAside + 2 * widthStroke)
  })

  it('корректно рассчитывает смещение через 1 час', () => {
    const { calendar } = setupStore()

    const time = (calendar.intervalStart as number) + oneHour

    // pixelsPerMinute = ((contextWidth - aside) / minutesInDay)
    const pixelsPerMinute =
      ((calendar.contextRect!.width as number) - widthCalendarAside) / (24 * 60)
    const expectedShift = 60 * pixelsPerMinute // 1 час
    const expectedX = widthCalendarAside + 2 * widthStroke + expectedShift

    const actualX = calendar.getX(time)
    expect(actualX).toBeCloseTo(expectedX)
  })
})
