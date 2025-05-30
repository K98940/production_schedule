<script setup lang="ts">
import { handleChangeDateRange } from '@/handlers/handleChangeDateRange'
import { useCalendarStore } from '@/store/calendar'
import { useCommonStore } from '@/store/common'
import { DatePicker } from 'primevue'
import { computed } from 'vue'

const calendar = useCalendarStore()
const common = useCommonStore()

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
      />
    </div>
    <p class="text-right text-s">
      Устройство: {{ common.selectedDevice }}, columnWidth {{ Math.round(calendar.columnWidth) }}
    </p>
  </header>
</template>
