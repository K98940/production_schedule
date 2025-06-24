<script setup lang="ts">
import { handleChangeDateRange } from '@/handlers/handleChangeDateRange'
import { useCalendarStore } from '@/store/calendar'
import { useFilterStore } from '@/store/filters'
import { DatePicker, Select } from 'primevue'
import { computed, ref } from 'vue'
import TheDayPicker from '../components/TheDayPicker.vue'
import TheWeekPicker from '@/components/TheWeekPicker.vue'

const calendar = useCalendarStore()
const filters = useFilterStore()

const selectedSection  = computed({ get: () => filters.selectedSection,  set: v => filters.selectedSection  = v })
const selectedWorkshop  = computed({ get: () => filters.selectedWorkshop,  set: v => filters.selectedWorkshop  = v })
const selectedFactory  = computed({ get: () => filters.selectedFactory,  set: v => filters.selectedFactory  = v })

const sections = ref([
  { name: 'Участок с длинным названием 01', code: '01' },
  { name: 'Участок 02', code: '02' },
  { name: 'Участок 03', code: '03' },
  { name: 'Уч.04', code: '04' },
])
const workshops = ref([
  { name: 'Цех с длинным названием  01', code: '01' },
  { name: 'Цех 02', code: '02' },
  { name: 'Цех 03', code: '03' },
])
const factories = ref([
  { name: 'Завод с длинным названием  01', code: '01' },
  { name: 'Завод 02', code: '02' },
  { name: 'Завод 03', code: '03' },
])
const orders = ref([
  { name: 'Заказ с длинным названием  01', code: '01' },
  { name: 'Заказ 02', code: '02' },
  { name: 'Заказ 03', code: '03' },
])
const shifts = ref([
  { name: 'Смена с длинным названием  01', code: '01' },
  { name: 'Смена 02', code: '02' },
  { name: 'Смена 03', code: '03' },
])
const planFact = ref([
  { name: 'План', code: '01' },
  { name: 'Факт', code: '02' },
  { name: 'План/факт', code: '03' },
])

const dates = computed({
  get: () => [calendar.dateStart, calendar.dateFinish],
  set: (newDates) => {
    if (!newDates[1]) return
    calendar.dateStart = newDates[0]
    calendar.dateFinish = newDates[1]
    handleChangeDateRange([dates.value[0], dates.value[1]])
  },
})

const handleChangeDay = () => {
  const currentDay = new Date()
  handleChangeDateRange([currentDay, currentDay])
}

const handleChangeWeek = () => {
  const currentDate = new Date()

  // Получаем понедельник текущей недели
  const monday = new Date(currentDate)
  const dayOfWeek = currentDate.getDay()
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // 0 = воскресенье, 1 = понедельник
  monday.setDate(currentDate.getDate() - daysToMonday)
  monday.setHours(0, 0, 0, 0)

  // Получаем воскресенье текущей недели
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  sunday.setHours(23, 59, 59, 999)

  handleChangeDateRange([monday, sunday])
}
</script>
<template>
  <header class="flex grow-0 w-full gap-4 justify-between mb-4">
    <div class="date-selectors flex w-[25%] gap-4 p-4 bg-white rounded-md">
      <TheDayPicker @changeDate="handleChangeDay" />
      <TheWeekPicker @changeDate="handleChangeWeek" />
      <DatePicker
        v-model="dates"
        selectionMode="range"
        :manualInput="false"
        dateFormat="dd.mm.yy"
        inputClass="!bg-purple-50"
        :selectOtherMonths="true"
      />
    </div>
    <div class="factory-selectors flex shrink-0 w-[35%] gap-4 p-4 bg-white rounded-md">
      <Select
        v-model="selectedSection"
        :options="sections"
        optionLabel="name"
        placeholder="Участок"
        class="text-xl"
        style="width: calc(33% - 0.5rem)"
      >
        <template #option="props">
          <span class="text-xl">
            {{ props.option.name }}
          </span>
        </template>
      </Select>

      <Select
        v-model="selectedWorkshop"
        :options="workshops"
        optionLabel="name"
        placeholder="Цех"
        class="text-xl"
        style="width: calc(33% - 0.5rem)"
      >
        <template #option="props">
          <span class="text-xl">
            {{ props.option.name }}
          </span>
        </template>
      </Select>

      <Select
        v-model="selectedFactory"
        :options="factories"
        optionLabel="name"
        placeholder="Завод"
        class="text-xl"
        style="width: calc(33% - 0.5rem)"
      >
        <template #option="props">
          <span class="text-xl">
            {{ props.option.name }}
          </span>
        </template>
      </Select>
    </div>

    <div class="order-selector flex shrink-0 w-[15%] gap-4 p-4 bg-white rounded-md">
      <Select
        v-model="filters.selectedOrder"
        :options="orders"
        optionLabel="name"
        placeholder="Заказ"
        class="text-xl w-full"
        style="width: 100%"
      >
        <template #option="props">
          <span class="text-xl">
            {{ props.option.name }}
          </span>
        </template>
      </Select>
    </div>

    <div class="shift-selector flex shrink-0 w-[10%] gap-4 p-4 bg-white rounded-md">
      <Select
        v-model="filters.selectedShift"
        :options="shifts"
        optionLabel="name"
        placeholder="Смена"
        class="text-xl w-full"
      >
        <template #option="props">
          <span class="text-xl">
            {{ props.option.name }}
          </span>
        </template>
      </Select>
    </div>

    <div class="plan-selector flex shrink-0 w-[15%] gap-4 p-4 bg-white rounded-md">
      <Select
        v-model="filters.selectedPlanFact"
        :options="planFact"
        optionLabel="name"
        placeholder="План/факт"
        class="text-xl w-full"
      >
        <template #option="props">
          <span class="text-xl">
            {{ props.option.name }}
          </span>
        </template>
      </Select>
    </div>
  </header>
</template>
