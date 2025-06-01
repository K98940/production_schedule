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
const devices = {
  '1': 'Ленточная пила',
  2: 'Фрезерный станок',
  3: 'Шлифов. станок',
  4: 'Сверлильный станок',
  5: 'Сборочный конвейер',
  6: 'Покрасоч. камера',
  7: 'Сушка ',
  8: 'Упаковоч. автомат',
}

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
    console.log('resize')
  }, 1000)
})

window.addEventListener('DOMContentLoaded', () => {
  const calendar = useCalendarStore()
  const data = useDataStore()

  const prefixDate = '2025-05-30T'
  const suffixDate = ':00.000'
  calendar.setDateStart(prefixDate.replace('T', ''))
  calendar.setDateFinish(prefixDate.replace('T', ''))

  data.tasks = [
    [
      {
        id: 1,
        dateStartISO: `${prefixDate}08:00${suffixDate}`,
        dateEndISO: `${prefixDate}11:00${suffixDate}`,
        duration:
          new Date(`${prefixDate}11:00${suffixDate}`).getTime() -
          new Date(`${prefixDate}08:00${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + 3,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'Распил заготовок',
        deviceID: '1',
        deviceTitle: devices['1'],
      },
    ],
    [
      {
        id: 2,
        dateStartISO: `${prefixDate}09:00${suffixDate}`,
        dateEndISO: `${prefixDate}12:00${suffixDate}`,
        duration:
          new Date(`${prefixDate}12:00${suffixDate}`).getTime() -
          new Date(`${prefixDate}09:00${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow + 3,
        nextId: 3,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'Фрезеровка ножек',
        deviceID: '2',
        deviceTitle: devices['2'],
      },
    ],
    [
      {
        id: 3,
        dateStartISO: `${prefixDate}10:00${suffixDate}`,
        dateEndISO: `${prefixDate}13:00${suffixDate}`,
        duration:
          new Date(`${prefixDate}13:00${suffixDate}`).getTime() -
          new Date(`${prefixDate}10:00${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 2 + 3,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'Шлифовка сиденья',
        deviceID: '3',
        deviceTitle: devices['3'],
      },
      {
        id: 10,
        dateStartISO: `${prefixDate}14:00${suffixDate}`,
        dateEndISO: `${prefixDate}18:00${suffixDate}`,
        duration:
          new Date(`${prefixDate}18:00${suffixDate}`).getTime() -
          new Date(`${prefixDate}14:00${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 2 + 3,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'Шлифовка после покраски',
        deviceID: '3',
        deviceTitle: devices['3'],
      },
    ],
    [
      {
        id: 4,
        dateStartISO: `${prefixDate}11:00${suffixDate}`,
        dateEndISO: `${prefixDate}14:00${suffixDate}`,
        duration:
          new Date(`${prefixDate}14:00${suffixDate}`).getTime() -
          new Date(`${prefixDate}11:00${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 3 + 3,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'Сверление отверстий',
        deviceID: '4',
        deviceTitle: devices['4'],
      },
    ],
    [
      {
        id: 5,
        dateStartISO: `${prefixDate}12:00${suffixDate}`,
        dateEndISO: `${prefixDate}16:00${suffixDate}`,
        duration:
          new Date(`${prefixDate}16:00${suffixDate}`).getTime() -
          new Date(`${prefixDate}12:00${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 4 + 3,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'Предварительная сборка',
        deviceID: '5',
        deviceTitle: devices['5'],
      },
      {
        id: 11,
        dateStartISO: `${prefixDate}18:00${suffixDate}`,
        dateEndISO: `${prefixDate}21:00${suffixDate}`,
        duration:
          new Date(`${prefixDate}21:00${suffixDate}`).getTime() -
          new Date(`${prefixDate}18:00${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 4 + 3,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'Контроль качества',
        deviceID: '5',
        deviceTitle: devices['5'],
      },
    ],
    [
      {
        id: 6,
        dateStartISO: `${prefixDate}13:00${suffixDate}`,
        dateEndISO: `${prefixDate}16:00${suffixDate}`,
        duration:
          new Date(`${prefixDate}16:00${suffixDate}`).getTime() -
          new Date(`${prefixDate}13:00${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 5 + 3,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'Грунтовка каркаса',
        deviceID: '6',
        deviceTitle: devices['6'],
      },
      {
        id: 7,
        dateStartISO: `${prefixDate}16:30${suffixDate}`,
        dateEndISO: `${prefixDate}19:30${suffixDate}`,
        duration:
          new Date(`${prefixDate}19:30${suffixDate}`).getTime() -
          new Date(`${prefixDate}16:30${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 5 + 3,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'Покраска стула',
        deviceID: '6',
        deviceTitle: devices['6'],
      },
    ],
    [
      {
        id: 8,
        dateStartISO: `${prefixDate}16:01${suffixDate}`,
        dateEndISO: `${prefixDate}19:00${suffixDate}`,
        duration:
          new Date(`${prefixDate}19:00${suffixDate}`).getTime() -
          new Date(`${prefixDate}16:01${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 6 + 3,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'Сушка после покраски',
        deviceID: '7',
        deviceTitle: devices['7'],
      },
    ],
    [
      {
        id: 9,
        dateStartISO: `${prefixDate}19:00${suffixDate}`,
        dateEndISO: `${prefixDate}22:00${suffixDate}`,
        duration:
          new Date(`${prefixDate}22:00${suffixDate}`).getTime() -
          new Date(`${prefixDate}19:00${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 7 + 3,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'Финальная сборка',
        deviceID: '8',
        deviceTitle: devices['8'],
      },
      {
        id: 12,
        dateStartISO: `${prefixDate}22:01${suffixDate}`,
        dateEndISO: `${prefixDate}23:50${suffixDate}`,
        duration:
          new Date(`${prefixDate}23:50${suffixDate}`).getTime() -
          new Date(`${prefixDate}22:01${suffixDate}`).getTime(),
        coordX: 0,
        coordY: heightCalendarTitle + heightCalendarRow * 7 + 3,
        nextId: 0,
        width: 0,
        height: heightCalendarRow - 4,
        title: 'Упаковка готового стула',
        deviceID: '8',
        deviceTitle: devices['8'],
      },
    ],
  ]

  handleChangeDateRange([calendar.dateStart, calendar.dateFinish])
})
