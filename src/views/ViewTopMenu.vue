<script setup lang="ts">
import { handleChangeDateRange } from '@/handlers/handleChangeDateRange'
import { useCalendarStore } from '@/store/calendar'
import { DatePicker } from 'primevue'
import { computed } from 'vue'

const calendar = useCalendarStore()

const dates = computed({
  get: () => [calendar.dateStart, calendar.dateFinish],
  set: (newDates) => {
    if (!newDates[1]) return
    calendar.dateStart = newDates[0]
    calendar.dateFinish = newDates[1]
    handleChangeDateRange(dates.value)
  },
})
</script>
<template>
  <header class="pb-3">
    <div class="flex justify-end">
      <DatePicker
        v-model="dates"
        selectionMode="range"
        :manualInput="false"
        dateFormat="dd.mm.yy"
        inputClass="!bg-purple-50"
        :selectOtherMonths="true"
      />
    </div>
    <p class="text-right text-s"></p>
  </header>
</template>
