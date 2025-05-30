import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('common', () => {
  /**Выбранная карточка задачи */
  const indexActiveElement = ref(-1)
  /**Выбранное устройство (оборудование, станок и т.п). */
  const selectedDevice = ref(null)
  const startX = ref(0)
  const startY = ref(0)

  return { indexActiveElement, startX, startY, selectedDevice }
})
