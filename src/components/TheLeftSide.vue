<script setup lang="ts">
import { heightCalendarRow, heightCalendarTitle, widthCalendarAside } from '@/constants/constants'
import { useDataStore } from '@/store/data'

const data = useDataStore()
</script>

<template>
  <div
    class="fixed-column text-center bg-amber-50"
    :style="`
      width: ${widthCalendarAside}px;
      height: ${heightCalendarTitle}px`"
  ></div>
  <div
    v-for="(device, indexDevice) in data.tasks"
    :key="device[0].deviceID"
    :index-device="indexDevice"
    :title="device[0].deviceTitle"
    class="fixed-column flex justify-center items-center text-xm text-center text-white bg-indigo-950"
    :style="`
      width: ${widthCalendarAside}px;
      height: ${heightCalendarRow}px`"
  >
    {{ device[0].deviceTitle }}
  </div>
</template>
<style>
.fixed-column {
  position: sticky;
  left: 0;
  z-index: 1;
  user-select: none;
}
</style>
