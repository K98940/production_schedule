import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCalendarStore } from '@/store/calendar'
import { widthCalendarAside } from '@/constants/constants'

/**
 * Набор юнит-тестов для геттера `calendar.getGridData`.
 * Проверяем:
 * 1. Количество возвращаемых элементов (24 на каждый час суток).
 * 2. Корректность значений первого элемента (`text`, `x1`, `day`).
 * 3. Равномерное увеличение координаты `x1` при увеличении индекса.
 */

describe('calendar.getGridData', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  /**
   * Инициализируем стор и подготавливаем данные для тестов.
   * Вручную задаём `columnWidth`, чтобы было проще проверять координаты `x1`.
   */
  const setupStore = () => {
    const calendar = useCalendarStore()

    // Задаём диапазон одной даты (24 часа)
    calendar.setDateStart('2025-05-30')
    calendar.setDateFinish('2025-05-30')

    // Явно задаём ширину колонки, чтобы расчёты были стабильными
    calendar.$patch({
      columnWidth: 50,
    })

    return calendar
  }

  it('возвращает 24 элемента для одного дня', () => {
    const calendar = setupStore()

    const grid = calendar.getGridData
    expect(grid.length).toBe(24)
  })

  it('первый элемент имеет корректные значения', () => {
    const calendar = setupStore()

    const first = calendar.getGridData[0]

    // Текст часа
    expect(first.text).toBe('00')

    // Координата x1 должна совпадать с шириной боковой панели
    expect(first.x1).toBe(widthCalendarAside)

    // Строка даты должна содержать дату 30.05.25 и день недели
    expect(first.day).toMatch(/30\.05\.25/)
  })

  it('x1 увеличивается на ширину колонки при увеличении индекса', () => {
    const calendar = setupStore()

    const firstX = calendar.getGridData[0].x1
    const secondX = calendar.getGridData[1].x1

    expect(secondX - firstX).toBe(calendar.columnWidth)
  })
})
