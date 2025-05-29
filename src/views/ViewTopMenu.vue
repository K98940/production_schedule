<script setup lang="ts">
import { handleChangeDateRange } from '@/handlers/handleChangeDateRange'
import { DatePicker } from 'primevue'
import { ref, watch } from 'vue'

const dates = ref<Date[]>()
watch(dates, () => handleChangeDateRange(dates))
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
    <p class="text-right">Дата: {{ dates }}</p>
  </header>
</template>
