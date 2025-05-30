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
import { heightCalendarRow, heightCalendarTitle } from './constants/constants'

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
    calendar.setDateStart('2025-05-26')
    calendar.grid = calendar.getGridData
    console.log('resize')
  }, 1000)
})

window.addEventListener('DOMContentLoaded', () => {
  const calendar = useCalendarStore()
  const data = useDataStore()

  const prefixDate = '2025-05-30T'
  const suffixDate = ':00:00.000'
  calendar.setDateStart(prefixDate.replace('T', ''))
  calendar.setDateFinish(prefixDate.replace('T', ''))

  data.tasks = [
    [
      {
        id: 1,
        dateStartISO: `${prefixDate}10${suffixDate}`,
        dateEndISO: `${prefixDate}15${suffixDate}`,
        duration:
          new Date(`${prefixDate}15${suffixDate}`).getTime() -
          new Date(`${prefixDate}10${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'task-1',
        deviceID: '1',
      },
      {
        id: 2,
        dateStartISO: `${prefixDate}17${suffixDate}`,
        dateEndISO: `${prefixDate}19${suffixDate}`,
        duration:
          new Date(`${prefixDate}19${suffixDate}`).getTime() -
          new Date(`${prefixDate}17${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle,
        nextId: 3,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'task-2',
        deviceID: '1',
      },
    ],
    [
      {
        id: 3,
        dateStartISO: `${prefixDate}11${suffixDate}`,
        dateEndISO: `${prefixDate}13${suffixDate}`,
        duration:
          new Date(`${prefixDate}13${suffixDate}`).getTime() -
          new Date(`${prefixDate}11${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'task-3',
        deviceID: '2',
      },
      {
        id: 4,
        dateStartISO: `${prefixDate}20${suffixDate}`,
        dateEndISO: `${prefixDate}23${suffixDate}`,
        duration:
          new Date(`${prefixDate}23${suffixDate}`).getTime() -
          new Date(`${prefixDate}20${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'task-4',
        deviceID: '2',
      },
    ],
    [
      {
        id: 5,
        dateStartISO: `${prefixDate}01${suffixDate}`,
        dateEndISO: `${prefixDate}04${suffixDate}`,
        duration:
          new Date(`${prefixDate}04${suffixDate}`).getTime() -
          new Date(`${prefixDate}01${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 2,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'task-5',
        deviceID: '3',
      },
      {
        id: 6,
        dateStartISO: `${prefixDate}08${suffixDate}`,
        dateEndISO: `${prefixDate}11${suffixDate}`,
        duration:
          new Date(`${prefixDate}11${suffixDate}`).getTime() -
          new Date(`${prefixDate}08${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 2,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'task-6',
        deviceID: '3',
      },
      {
        id: 7,
        dateStartISO: `${prefixDate}14${suffixDate}`,
        dateEndISO: `${prefixDate}17${suffixDate}`,
        duration:
          new Date(`${prefixDate}17${suffixDate}`).getTime() -
          new Date(`${prefixDate}14${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 2,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'task-7',
        deviceID: '3',
      },
    ],
    [
      {
        id: 8,
        dateStartISO: `${prefixDate}03${suffixDate}`,
        dateEndISO: `${prefixDate}05${suffixDate}`,
        duration:
          new Date(`${prefixDate}05${suffixDate}`).getTime() -
          new Date(`${prefixDate}03${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 3,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'task-8',
        deviceID: '4',
      },
    ],
    [
      {
        id: 9,
        dateStartISO: `${prefixDate}04${suffixDate}`,
        dateEndISO: `${prefixDate}06${suffixDate}`,
        duration:
          new Date(`${prefixDate}06${suffixDate}`).getTime() -
          new Date(`${prefixDate}04${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 4,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'task-9',
        deviceID: '5',
      },
    ],
    [
      {
        id: 10,
        dateStartISO: `${prefixDate}05${suffixDate}`,
        dateEndISO: `${prefixDate}09${suffixDate}`,
        duration:
          new Date(`${prefixDate}09${suffixDate}`).getTime() -
          new Date(`${prefixDate}05${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 5,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'task-10',
        deviceID: '6',
      },
    ],
    [
      {
        id: 11,
        dateStartISO: `${prefixDate}07${suffixDate}`,
        dateEndISO: `${prefixDate}09${suffixDate}`,
        duration:
          new Date(`${prefixDate}09${suffixDate}`).getTime() -
          new Date(`${prefixDate}07${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 6,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'task-11',
        deviceID: '7',
      },
    ],
    [
      {
        id: 12,
        dateStartISO: `${prefixDate}10${suffixDate}`,
        dateEndISO: `${prefixDate}13${suffixDate}`,
        duration:
          new Date(`${prefixDate}13${suffixDate}`).getTime() -
          new Date(`${prefixDate}10${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 7,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'task-12',
        deviceID: '8',
      },
    ],
    [
      {
        id: 13,
        dateStartISO: `${prefixDate}12${suffixDate}`,
        dateEndISO: `${prefixDate}14${suffixDate}`,
        duration:
          new Date(`${prefixDate}14${suffixDate}`).getTime() -
          new Date(`${prefixDate}12${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 8,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'task-13',
        deviceID: '9',
      },
    ],
    [
      {
        id: 14,
        dateStartISO: `${prefixDate}15${suffixDate}`,
        dateEndISO: `${prefixDate}18${suffixDate}`,
        duration:
          new Date(`${prefixDate}18${suffixDate}`).getTime() -
          new Date(`${prefixDate}15${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 9,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'task-14',
        deviceID: '10',
      },
    ],
    [
      {
        id: 15,
        dateStartISO: `${prefixDate}16${suffixDate}`,
        dateEndISO: `${prefixDate}19${suffixDate}`,
        duration:
          new Date(`${prefixDate}19${suffixDate}`).getTime() -
          new Date(`${prefixDate}16${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 10,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'task-15',
        deviceID: '11',
      },
    ],
  ]

  handleChangeDateRange([calendar.dateStart, calendar.dateFinish])
})
