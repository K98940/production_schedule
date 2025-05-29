import { widthColumnContainer } from '@/constants/constants'
import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    dateStart: new Date() as Date,
    dateFinish: new Date() as Date,
    intervalStart: null as null | number,
    intervalFinish: null as null | number,
    countMiliseconds: 0,
    workTimeStart: '08:00' as string,
    workTimeFinish: '17:00' as string,
    nodeContext: null as HTMLDivElement | null,
    contextCoord: null as DOMRect,
    columnWidth: 0,
    grid: null,
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
    getGridData(state) {
      this.contextCoord = state.nodeContext.getBoundingClientRect()
      const hours: number[] = this.getSequenceHours
      state.columnWidth = state.contextCoord.width / hours.length

      return hours.map((h, index) => {
        const d = new Date(h)
        const hour = d.getHours()
        return {
          x1: index * state.columnWidth,
          text: `${hour}`,
        }
      })
    },
    pixelsPerMinute(state) {
      return state.countMiliseconds
        ? state.contextCoord.width / (state.countMiliseconds / 1000 / 60)
        : 0
    },
  },
  actions: {
    setDateStart(date: string) {
      this.dateStart = new Date(date)
      this.intervalStart = new Date(date)
      this.intervalStart.setHours(0, 0, 0, 0)
      this.intervalStart = this.intervalStart.getTime()
      this.countMiliseconds = this.intervalFinish - this.intervalStart
    },
    setDateFinish(date: string) {
      this.dateFinish = new Date(date)
      this.intervalFinish = new Date(date)
      this.intervalFinish.setHours(24, 0, 0, 0)
      this.intervalFinish = this.intervalFinish.getTime()
      this.countMiliseconds = this.intervalFinish - this.intervalStart
    },
    getX(time: number) {
      const zeroCoordX = widthColumnContainer / 2
      // const pixelsPerMinute = this.countMiliseconds
      //   ? this.contextCoord.width / (this.countMiliseconds / 1000 / 60)
      //   : 0
      const differentMsec = time - this.intervalStart
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
