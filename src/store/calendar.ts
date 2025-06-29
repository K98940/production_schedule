import {
  heightCalendarRow,
  heightCalendarTitle,
  minWidthCalendarColumn,
  widthCalendarAside,
  widthStroke,
} from '@/constants/constants'
import { defineStore } from 'pinia'
import { useDataStore } from './data'

export type CalendarGridData = {
  x1: number
  text: string
  day: string
}

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    dateStart: null as unknown as Date,
    dateFinish: null as unknown as Date,
    intervalStart: null as null | number,
    intervalFinish: null as null | number,
    countMiliseconds: 0,
    workTimeStart: '08:00' as string,
    workTimeFinish: '17:00' as string,
    nodeContext: null as HTMLDivElement | null,
    contextRect: null as unknown as DOMRect,
    contextWidth: undefined as undefined | number,
    columnWidth: undefined as undefined | number,
    hours: [] as number[],
    grid: null as null | CalendarGridData[],
  }),
  getters: {
    dateStartISO(state) {
      return state.dateStart?.toISOString()
    },
    dateFinishISO(state) {
      return state.dateFinish?.toISOString()
    },
    getSequenceHours(state): number[] {
      const intervalStart = new Date(state.dateStart)
      const intervalFinish = new Date(state.dateFinish)
      intervalStart.setHours(0, 0, 0, 0)
      intervalFinish.setHours(24, 0, 0, 0)

      const intervals: number[] = []
      let pred = 0

      while (pred < 1000 && intervalStart.getTime() < intervalFinish.getTime()) {
        pred++
        intervals.push(intervalStart.getTime())
        intervalStart.setHours(intervalStart.getHours() + 1)
      }
      return intervals
    },
    getGridData(state): CalendarGridData[] {
      const data = useDataStore()
      state.hours = this.getSequenceHours

      if (state.nodeContext) {
        state.nodeContext.style.width = `100%`
        state.contextRect = state.nodeContext.getBoundingClientRect()
        state.contextWidth = state.contextRect.width
        state.columnWidth = (state.contextRect.width - widthCalendarAside) / state.hours.length

        if (state.columnWidth < minWidthCalendarColumn) {
          state.nodeContext.style.width = `${minWidthCalendarColumn * state.hours.length + widthCalendarAside}px`
          state.contextRect = state.nodeContext.getBoundingClientRect()
          state.contextWidth = state.contextRect.width
          state.columnWidth = (state.contextRect.width - widthCalendarAside) / state.hours.length
        }

        state.nodeContext.style.flexBasis = `${heightCalendarTitle + data.devices.length * heightCalendarRow}px`
      }

      return state.hours.map((h, index) => {
        const d = new Date(h)
        const hour = d.getHours()
        return {
          x1: index * (state.columnWidth || 0) + widthCalendarAside,
          text: `${hour}`.padStart(2, '0'),
          day: `${d.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          })}, ${d.toLocaleDateString('ru-RU', { weekday: 'short' })}`,
        }
      })
    },
    pixelsPerMinute(state) {
      return (state.contextRect?.width - widthCalendarAside) / (state.countMiliseconds / 1000 / 60)
    },
  },
  actions: {
    setDateStart(date: string) {
      this.dateStart = new Date(date)
      const start = new Date(date)
      start.setHours(0, 0, 0, 0)
      this.intervalStart = start.getTime()
      this.countMiliseconds = (this.intervalFinish || 0) - this.intervalStart
    },
    setDateFinish(date: string) {
      this.dateFinish = new Date(date)
      const finish = new Date(date)
      finish.setHours(24, 0, 0, 0)
      this.intervalFinish = finish.getTime()
      this.countMiliseconds = this.intervalFinish - (this.intervalStart || 0)
    },
    getX(time: number) {
      const differentMsec = time - (this.intervalStart || 0)
      /**Разница во времени между началом календаря и началом задачи в карточке */
      const differenteMinutes = differentMsec / 1000 / 60
      /**Кол-во пикселей, на которое надо сдвинуть карточку по оси Х */
      const shiftX = differenteMinutes * this.pixelsPerMinute
      /**Итоговое кол-во пикселей, на которое надо сдвинуть карточку по оси Х, с учетом
       * поправки на ширину боковой панели*/
      const result = widthCalendarAside + shiftX + widthStroke * 2
      return result
    },
    getWidth(duration: number): number {
      const durationMinutes = duration / 1000 / 60
      return this.pixelsPerMinute * durationMinutes - widthStroke * 2
    },
  },
})
