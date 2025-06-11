<script setup lang="ts">
import { handleChangeDateRange } from '@/handlers/handleChangeDateRange'
import { useCalendarStore } from '@/store/calendar'
import { DatePicker, Select } from 'primevue'
import { computed, ref } from 'vue'
import TheDayPicker from '../components/TheDayPicker.vue'
import TheWeekPicker from '@/components/TheWeekPicker.vue'

const calendar = useCalendarStore()

const selectedSection = ref() // Участок
const selectedWorkshop = ref() // Цех
const selectedFactory = ref() // Цех
const selectedOrder = ref() // Заказ
const selectedShift = ref() // Смена
const selectedPlanFact = ref() // План/Факт

const sections = ref([
  { name: 'Участок 01', code: '01' },
  { name: 'Участок 02', code: '02' },
  { name: 'Участок 03', code: '03' },
  { name: 'Уч.04', code: '04' },
])
const workshops = ref([
  { name: 'Цех 01', code: '01' },
  { name: 'Цех 02', code: '02' },
  { name: 'Цех 03', code: '03' },
])
const factories = ref([
  { name: 'Завод 01', code: '01' },
  { name: 'Завод 02', code: '02' },
  { name: 'Завод 03', code: '03' },
])
const orders = ref([
  { name: 'Заказ 01', code: '01' },
  { name: 'Заказ 02', code: '02' },
  { name: 'Заказ 03', code: '03' },
])
const shifts = ref([
  { name: 'Смена 01', code: '01' },
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
</script>
<template>
  <header class="flex grow-0 w-full gap-4 justify-between mb-4">
    <div class="date-selectors flex w-[25%] gap-4 p-4 bg-white rounded-md">
      <TheDayPicker />
      <TheWeekPicker />
      <DatePicker
        v-model="dates"
        selectionMode="range"
        :manualInput="false"
        dateFormat="dd.mm.yy"
        inputClass="!bg-purple-50"
        :selectOtherMonths="true"
      />
    </div>
    <div class="factory-selectors flex w-[35%] gap-4 p-4 bg-white rounded-md">
      <Select
        v-model="selectedSection"
        :options="sections"
        optionLabel="name"
        placeholder="Участок"
        class="text-3xl grow-1"
      >
        <template #value="props">
          <div v-if="props.value" class="">
            {{
              props.value.name.length > 9
                ? props.value.name.slice(0, 6).padEnd(9, '.')
                : props.value.name
            }}
          </div>
        </template>
        <template #option="props">
          <span class="text-2xl">
            {{ props.option.name }}
          </span>
        </template>
      </Select>

      <Select
        v-model="selectedWorkshop"
        :options="workshops"
        optionLabel="name"
        placeholder="Цех"
        class="text-3xl grow-1"
      >
        <template #option="props">
          <span class="text-2xl">
            {{ props.option.name }}
          </span>
        </template>
      </Select>

      <Select
        v-model="selectedFactory"
        :options="factories"
        optionLabel="name"
        placeholder="Завод"
        class="text-3xl grow-1"
      >
        <template #option="props">
          <span class="text-2xl">
            {{ props.option.name }}
          </span>
        </template>
      </Select>
    </div>

    <div class="order-selector flex w-[15%] gap-4 p-4 bg-white rounded-md">
      <Select
        v-model="selectedOrder"
        :options="orders"
        optionLabel="name"
        placeholder="Заказ"
        class="text-3xl w-full"
      >
        <template #option="props">
          <span class="text-2xl">
            {{ props.option.name }}
          </span>
        </template>
      </Select>
    </div>

    <div class="shift-selector flex w-[10%] gap-4 p-4 bg-white rounded-md">
      <Select
        v-model="selectedShift"
        :options="shifts"
        optionLabel="name"
        placeholder="Смена"
        class="text-3xl w-full"
      >
        <template #option="props">
          <span class="text-2xl">
            {{ props.option.name }}
          </span>
        </template>
      </Select>
    </div>

    <div class="plan-selector flex w-[15%] gap-4 p-4 bg-white rounded-md">
      <Select
        v-model="selectedPlanFact"
        :options="planFact"
        optionLabel="name"
        placeholder="План/факт"
        class="text-3xl w-full"
      >
        <template #option="props">
          <span class="text-2xl">
            {{ props.option.name }}
          </span>
        </template>
      </Select>
    </div>
  </header>
</template>
