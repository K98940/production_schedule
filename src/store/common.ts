import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('common', () => {
  /**Выбранная карточка задачи */
  const indexActiveElement = ref(-1)
  /**Выбранное устройство (оборудование, станок и т.п). */
  const selectedDevice = ref()
  const idTask = ref(0)
  const startX = ref(0)
  const startY = ref(0)
  const coordMouseX = ref(0)
  const coordX = ref(0)
  const newCoordX = ref(0)
  const newDate = ref<Date>(new Date())

  return {
    indexActiveElement,
    idTask,
    startX,
    startY,
    coordMouseX,
    coordX,
    newCoordX,
    newDate,
    selectedDevice,
  }
})
