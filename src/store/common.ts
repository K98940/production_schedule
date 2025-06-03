import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('common', () => {
  /**Выбранная карточка задачи, её индекс в массиве задач */
  const indexActiveCard = ref(-1)
  /**Выбранное устройство (оборудование, станок и т.п)., его индекс в массиве задач */
  const selectedDevice = ref()
  /**ID задачи/карточки на которую нажал пользователь (активная карточка)*/
  const idTask = ref(0)
  const startX = ref(0)
  const startY = ref(0)
  const coordMouseX = ref(0)
  const coordX = ref(0)
  const newCoordX = ref(0)
  const newDate = ref<Date>(new Date())
  /**Флаг — активная карточка пересекается с другой карточкой */
  const isIntersecting = ref(false)
  /**Карточка с которой произошло пересечение, её индекс в массиве задач*/
  const indexIntersectingCard = ref<number | null>(null)

  return {
    indexActiveCard,
    indexIntersectingCard,
    idTask,
    startX,
    startY,
    coordMouseX,
    coordX,
    newCoordX,
    newDate,
    selectedDevice,
    isIntersecting,
  }
})
