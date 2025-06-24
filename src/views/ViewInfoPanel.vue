<script setup lang="ts">
import { useCalendarStore } from '@/store/calendar'
import { getDateFormatted } from '@/hooks/getDateFormatted'
import { useFilterStore } from '@/store/filters'
const calendar = useCalendarStore()
const filters = useFilterStore()
</script>

<template>
  <div class="flex flex-col gap-2 pb-4 select-none font-mono">
    <span class="text-xl text-purple-200">
      {{ getDateFormatted(calendar.dateStart) }} - {{ getDateFormatted(calendar.dateFinish) }}
    </span>
    <div class="flex gap-2">
      <span v-if="filters.selectedFactory" class="text-xl text-purple-200">
        {{ filters.selectedFactory?.name }}
      </span>
      <span v-if="filters.selectedFactory && (filters.selectedWorkshop || filters.selectedSection)" class="text-xl text-yellow-300">
        >
      </span>
      <span v-if="filters.selectedWorkshop" class="text-xl text-purple-200">
        {{ filters.selectedWorkshop?.name }}
      </span>
      <span v-if="filters.selectedWorkshop && filters.selectedSection" class="text-xl text-yellow-300">
        >
      </span>
      <span v-if="filters.selectedSection" class="text-xl text-purple-200">
        {{ filters.selectedSection?.name }}
      </span>
    </div>
  </div>
</template>

<style scoped></style>
