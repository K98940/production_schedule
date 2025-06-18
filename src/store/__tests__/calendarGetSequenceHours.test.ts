/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCalendarStore } from '@/store/calendar'

const setDates = (calendar: ReturnType<typeof useCalendarStore>, start: string, finish: string) => {
  calendar.setDateStart(start)
  calendar.setDateFinish(finish)
}

describe('calendar.getSequenceHours', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('возвращает 24 элемента для одного дня', () => {
    const calendar = useCalendarStore()
    setDates(calendar, '2025-05-30', '2025-05-30')

    const seq = calendar.getSequenceHours
    expect(seq.length).toBe(24)

    const first = seq[0]
    const last = seq[23]

    expect(first).toBe(new Date('2025-05-30T00:00:00').getTime())
    expect(last).toBe(new Date('2025-05-30T23:00:00').getTime())
  })

  it('возвращает корректное количество часов для интервала 3 дня', () => {
    const calendar = useCalendarStore()
    setDates(calendar, '2025-05-28', '2025-05-30')

    const seq = calendar.getSequenceHours
    // 28, 29, 30 → 3*24 = 72
    expect(seq.length).toBe(72)
    const first = seq[0]
    const last = seq[71]

    expect(first).toBe(new Date('2025-05-28T00:00:00').getTime())
    expect(last).toBe(new Date('2025-05-30T23:00:00').getTime())
  })
})
