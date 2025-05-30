import { widthCalendarColumn } from '@/constants/constants'
import { defineStore } from 'pinia'

export type CalendarGridData = {
  x1: number
  text: string
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
    contextCoord: null as unknown as DOMRect,
    columnWidth: undefined as undefined | number,
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
      const hours: number[] = this.getSequenceHours
      if (state.nodeContext) {
        state.contextCoord = state.nodeContext.getBoundingClientRect()
        state.columnWidth = state.contextCoord.width / hours.length
        if (state.columnWidth < 30) {
          state.nodeContext.style.width = `${widthCalendarColumn * hours.length}px`
          state.nodeContext.style.overflow = 'auto'
          state.contextCoord = state.nodeContext?.getBoundingClientRect()
          state.columnWidth = state.contextCoord?.width / hours.length
        } else {
          state.nodeContext.style.overflow = 'hidden'
        }
      }

      return hours.map((h, index) => {
        const d = new Date(h)
        const hour = d.getHours()
        return {
          x1: index * (state.columnWidth || 0),
          text: `${hour}`,
        }
      })
    },
    pixelsPerMinute(state) {
      return state.countMiliseconds
        ? state.contextCoord?.width / (state.countMiliseconds / 1000 / 60)
        : 0
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
      const zeroCoordX = widthCalendarColumn / 2
      const differentMsec = time - (this.intervalStart || 0)
      const differenteMinutes = differentMsec / 1000 / 60
      const shiftX = differenteMinutes * this.pixelsPerMinute
      const result = zeroCoordX + shiftX
      return result
    },
    getWidth(duration: number): number {
      const durationMinutes = duration / 1000 / 60
      return this.pixelsPerMinute * durationMinutes
    },
  },
})
