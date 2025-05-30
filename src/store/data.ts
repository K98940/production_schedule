import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCalendarStore } from './calendar'

export type Task = {
  id: number
  dateStartISO: string
  dateEndISO: string
  duration: number
  coordX: number
  coordY: number
  nextId: number
  width: number
  height: number
  title: string
  deviceID: string
}

export const useDataStore = defineStore('data', () => {
  /**Все полученные задачи */
  const tasks = ref<Task[][]>([])

  const calculateCoord = () => {
    const calendar = useCalendarStore()

    tasks.value.forEach((device) => {
      device.forEach((task) => {
        task.coordX = calendar.getX(new Date(task.dateStartISO).getTime())
        task.width = calendar.getWidth(task.duration)
      })
    })
  }

  return { tasks, calculateCoord }
})
