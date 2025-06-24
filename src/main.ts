import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import { DialogService, ToastService, ConfirmationService } from 'primevue'
import { useCalendarStore } from './store/calendar'
import { handleChangeDateRange } from './handlers/handleChangeDateRange'
import { useFilterStore } from './store/filters'

let debounceTimer = 0

const app = createApp(App)
app
  .use(createPinia())
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
    locale: {
      emptyMessage: 'нет данных',
      startsWith: 'Начинается с…',
      contains: 'Содержит',
      notContains: 'Не содержит',
      endsWith: 'Заканчивается на…',
      equals: 'Равно',
      notEquals: 'Не равно',
      noFilter: 'Без фильтра',
      today: 'Сегодня',
      clear: 'Очистить',
      monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      firstDayOfWeek: 1,
    },
  })
  .use(ToastService)
  .use(DialogService)
  .use(ConfirmationService)
app.mount('#app')

window.addEventListener('resize', () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    const calendar = useCalendarStore()
    handleChangeDateRange([calendar.dateStart, calendar.dateFinish])
  }, 1000)
})

window.addEventListener('DOMContentLoaded', () => {
  const filters = useFilterStore()
  filters.selectedFactory = { name: 'Завод с длинным названием  01', code: '01' }
  filters.selectedWorkshop = { name: 'Цех 02', code: '02' }
  filters.selectedSection = { name: 'Уч.04', code: '04' }
  // Стартовое отображение (используем дату из предыдущих мок-данных для согласованности с тестами)
  const initialDate = new Date('2025-05-30')
  handleChangeDateRange([initialDate, initialDate])
})
