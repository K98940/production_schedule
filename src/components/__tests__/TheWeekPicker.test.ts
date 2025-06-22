import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheWeekPicker from '../TheWeekPicker.vue'

describe('TheWeekPicker', () => {
  it('должен эмитить событие changeDate при клике на кнопку', async () => {
    const wrapper = mount(TheWeekPicker)

    // Находим кнопку и кликаем по ней
    const button = wrapper.find('button')
    await button.trigger('click')

    // Проверяем, что событие было эмичено
    expect(wrapper.emitted()).toHaveProperty('changeDate')
    expect(wrapper.emitted('changeDate')).toHaveLength(1)
  })

  it('должен отображать текст "Неделя"', () => {
    const wrapper = mount(TheWeekPicker)

    const buttonText = wrapper.find('span').text()
    expect(buttonText).toBe('Неделя')
  })

  it('должен иметь правильные CSS классы', () => {
    const wrapper = mount(TheWeekPicker)

    const span = wrapper.find('span')
    expect(span.classes()).toContain('text-xl')
    expect(span.classes()).toContain('cursor-pointer')
  })
})
