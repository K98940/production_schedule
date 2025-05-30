import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import { DialogService, ToastService, ConfirmationService } from 'primevue'
import { useCalendarStore } from './store/calendar'
import { useDataStore } from './store/data'
import { handleChangeDateRange } from './handlers/handleChangeDateRange'

let debounceTimer = null

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
    calendar.setDateStart('2025-05-26')
    calendar.grid = calendar.getGridData
    console.log('resize')
  }, 1000)
})

window.addEventListener('DOMContentLoaded', () => {
  const calendar = useCalendarStore()
  const data = useDataStore()

  calendar.setDateStart('2025-05-28')
  calendar.setDateFinish('2025-05-28')

  data.tasks = [
    {
      id: 1,
      dateStartISO: '2025-05-27T20:00:00.000',
      dateEndISO: '2025-05-28T10:00:00.000',
      duration:
        new Date('2025-05-28T10:00:00.000').getTime() -
        new Date('2025-05-27T20:00:00.000').getTime(),
      coordX: 0,
      coordY: 80,
      nextId: 0,
      width: 0,
      height: 100,
      title: 'task-1',
    },
    {
      id: 2,
      dateStartISO: '2025-05-28T11:30:00.000',
      dateEndISO: '2025-05-28T14:00:00.000',
      duration:
        new Date('2025-05-28T14:00:00.000').getTime() -
        new Date('2025-05-28T11:30:00.000').getTime(),
      coordX: 0,
      coordY: 80,
      nextId: 3,
      width: 0,
      height: 100,
      title: 'task-2',
    },
    {
      id: 3,
      dateStartISO: '2025-05-28T15:00:00.000',
      dateEndISO: '2025-05-28T17:00:00.000',
      duration:
        new Date('2025-05-28T17:00:00.000').getTime() -
        new Date('2025-05-28T15:00:00.000').getTime(),
      coordX: 0,
      coordY: 80,
      nextId: 0,
      width: 0,
      height: 100,
      title: 'task-3',
    },
    {
      id: 4,
      dateStartISO: '2025-05-28T18:00:00.000',
      dateEndISO: '2025-05-28T20:00:00.000',
      duration:
        new Date('2025-05-28T20:00:00.000').getTime() -
        new Date('2025-05-28T18:00:00.000').getTime(),
      coordX: 0,
      coordY: 80,
      nextId: 0,
      width: 0,
      height: 100,
      title: 'task-4',
    },
  ]
  calendar.setDateStart('2025-05-28')
  calendar.setDateFinish('2025-05-28')
  handleChangeDateRange([calendar.dateStart, calendar.dateFinish])
})
