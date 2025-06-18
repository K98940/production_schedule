import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { calcTaskPosition } from '@/hooks/calcTaskPosition'

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
  deviceTitle: string
}

export const useDataStore = defineStore('data', () => {
  /**Все полученные задачи */
  const tasks = ref<Task[][]>([])

  const calculateCoord = () => {
    tasks.value.forEach((device) => {
      device.forEach((task) => {
        const { coordX, width } = calcTaskPosition(task)
        task.coordX = coordX
        task.width = width
      })
    })
  }

  /**Геттер, возвращает массив из ID устройств (станков и т.п.) пришедших в задачах */
  const devices = computed(() => {
    const devicesSet = new Set()
    tasks.value.forEach((device) => {
      devicesSet.add(device[0].deviceID)
    })
    return Array.from(devicesSet)
  })

  return { tasks, calculateCoord, devices }
})
