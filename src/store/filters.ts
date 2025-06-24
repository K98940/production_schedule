import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Selector {
  name: string
  code: string
}

export const useFilterStore = defineStore('filters', () => {
  const selectedFactory = ref<Selector | null>(null) // Завод
  const selectedWorkshop = ref<Selector | null>(null) // Цех
  const selectedSection = ref<Selector | null>(null) // Участок
  const selectedOrder = ref<Selector | null>(null) // Заказ
  const selectedShift = ref<Selector | null>(null) // Смена
  const selectedPlanFact = ref<Selector | null>(null) // План/Факт

  return { selectedFactory, selectedWorkshop, selectedOrder, selectedShift, selectedPlanFact, selectedSection }
})
