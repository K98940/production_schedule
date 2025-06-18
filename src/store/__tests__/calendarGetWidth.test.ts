/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCalendarStore } from '@/store/calendar'
import { widthCalendarAside, widthStroke } from '@/constants/constants'

const oneMinute = 60 * 1000
const oneHour = 60 * oneMinute
const oneDay = 24 * oneHour

describe('calendar.getWidth', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const setupStore = () => {
    const calendar = useCalendarStore()
    const contextWidth = 1000

    calendar.$patch({
      contextRect: { width: contextWidth } as any,
      countMiliseconds: oneDay,
    })

    return { calendar, contextWidth }
  }

  it('возвращает ширину для 1 часа', () => {
    const { calendar, contextWidth } = setupStore()

    const pixelsPerMinute = (contextWidth - widthCalendarAside) / (24 * 60)
    const expected = pixelsPerMinute * 60 - widthStroke * 2

    expect(calendar.getWidth(oneHour)).toBeCloseTo(expected)
  })

  it('возвращает ширину для 30 минут', () => {
    const { calendar, contextWidth } = setupStore()

    const pixelsPerMinute = (contextWidth - widthCalendarAside) / (24 * 60)
    const expected = pixelsPerMinute * 30 - widthStroke * 2

    expect(calendar.getWidth(30 * oneMinute)).toBeCloseTo(expected)
  })

  it('возвращает ширину для 32 часов (> 24 ч)', () => {
    const { calendar, contextWidth } = setupStore()

    const pixelsPerMinute = (contextWidth - widthCalendarAside) / (24 * 60)
    const hours32 = 32 * oneHour
    const expected = pixelsPerMinute * (32 * 60) - widthStroke * 2

    expect(calendar.getWidth(hours32)).toBeCloseTo(expected)
  })
})
