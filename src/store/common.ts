import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('common', () => {
  const indexActiveElement = ref(-1)
  const startX = ref(0)
  const startY = ref(0)

  return { indexActiveElement, startX, startY }
})
