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
}

export const useDataStore = defineStore('data', () => {
  const tasks = ref<Task[]>([])

  const calculateCoord = () => {
    const calendar = useCalendarStore()

    tasks.value.forEach((t) => {
      t.coordX = calendar.getX(new Date(t.dateStartISO).getTime())
      t.width = calendar.getWidth(t.duration)
    })
  }

  return { tasks, calculateCoord }
})
