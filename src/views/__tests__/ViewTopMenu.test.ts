import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import ViewTopMenu from '../ViewTopMenu.vue'
import { handleChangeDateRange } from '@/handlers/handleChangeDateRange'

// Мокаем PrimeVue компоненты
vi.mock('primevue', () => ({
  DatePicker: {
    template: '<div data-testid="date-picker">DatePicker</div>',
  },
  Select: {
    template: '<div data-testid="select">Select</div>',
  },
}))

// Мокаем хук handleChangeDateRange
vi.mock('@/handlers/handleChangeDateRange', () => ({
  handleChangeDateRange: vi.fn(),
}))

// Мокаем дочерние компоненты
vi.mock('@/components/TheDayPicker.vue', () => ({
  default: {
    template: '<button data-testid="day-picker" @click="$emit(\'changeDate\')">День</button>',
    emits: ['changeDate'],
  },
}))

vi.mock('@/components/TheWeekPicker.vue', () => ({
  default: {
    template: '<div data-testid="week-picker">Неделя</div>',
  },
}))

describe('ViewTopMenu', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('должен вызывать handleChangeDateRange с текущей датой при обработке события changeDate от TheDayPicker', async () => {
    const wrapper = mount(ViewTopMenu)

    // Находим кнопку TheDayPicker и кликаем по ней
    const dayPickerButton = wrapper.find('[data-testid="day-picker"]')
    await dayPickerButton.trigger('click')

    // Проверяем, что handleChangeDateRange был вызван
    expect(handleChangeDateRange).toHaveBeenCalledTimes(1)

    // Проверяем, что функция была вызвана с массивом из двух одинаковых дат
    const callArgs = vi.mocked(handleChangeDateRange).mock.calls[0][0]
    expect(callArgs).toHaveLength(2)
    expect(callArgs[0]).toBeInstanceOf(Date)
    expect(callArgs[1]).toBeInstanceOf(Date)

    // Проверяем, что обе даты одинаковые (текущий день)
    const firstDate = callArgs[0] as Date
    const secondDate = callArgs[1] as Date
    expect(firstDate.getTime()).toBe(secondDate.getTime())
  })

  it('должен вызывать handleChangeDateRange с диапазоном недели при обработке события changeDate от TheWeekPicker', async () => {
    // Мокаем TheWeekPicker с событием
    vi.mock('@/components/TheWeekPicker.vue', () => ({
      default: {
        template: '<button data-testid="week-picker" @click="$emit(\'changeDate\')">Неделя</button>',
        emits: ['changeDate'],
      },
    }))

    // Перемонтируем компонент с новым моком
    const newWrapper = mount(ViewTopMenu)

    // Находим кнопку TheWeekPicker и кликаем по ней
    const weekPickerButton = newWrapper.find('[data-testid="week-picker"]')
    await weekPickerButton.trigger('click')

    // Проверяем, что handleChangeDateRange был вызван
    expect(handleChangeDateRange).toHaveBeenCalledTimes(1)

    // Проверяем, что функция была вызвана с массивом из двух дат
    const callArgs = vi.mocked(handleChangeDateRange).mock.calls[0][0]
    expect(callArgs).toHaveLength(2)
    expect(callArgs[0]).toBeInstanceOf(Date)
    expect(callArgs[1]).toBeInstanceOf(Date)

    // Проверяем, что даты разные (начало и конец недели)
    const firstDate = callArgs[0] as Date
    const secondDate = callArgs[1] as Date
    expect(firstDate.getTime()).not.toBe(secondDate.getTime())

    // Проверяем, что первая дата - понедельник (день недели = 1)
    expect(firstDate.getDay()).toBe(1)

    // Проверяем, что вторая дата - воскресенье (день недели = 0)
    expect(secondDate.getDay()).toBe(0)
  })

  it('должен содержать все необходимые селекторы', () => {
    const wrapper = mount(ViewTopMenu)

    // Проверяем наличие основных блоков
    expect(wrapper.find('.date-selectors').exists()).toBe(true)
    expect(wrapper.find('.factory-selectors').exists()).toBe(true)
    expect(wrapper.find('.order-selector').exists()).toBe(true)
    expect(wrapper.find('.shift-selector').exists()).toBe(true)
    expect(wrapper.find('.plan-selector').exists()).toBe(true)
  })

  it('должен содержать TheDayPicker в блоке date-selectors', () => {
    const wrapper = mount(ViewTopMenu)

    const dateSelectors = wrapper.find('.date-selectors')
    expect(dateSelectors.find('[data-testid="day-picker"]').exists()).toBe(true)
  })

  it('должен содержать TheWeekPicker в блоке date-selectors', () => {
    const wrapper = mount(ViewTopMenu)

    const dateSelectors = wrapper.find('.date-selectors')
    expect(dateSelectors.find('[data-testid="week-picker"]').exists()).toBe(true)
  })
})
