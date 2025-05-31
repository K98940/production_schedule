<script setup lang="ts">
import { heightCalendarRow, heightCalendarTitle, widthCalendarAside } from '@/constants/constants'

defineProps<{
  indexDevice: number
  title: string
}>()
</script>

<template>
  <div
    class="fixed-column flex justify-center items-center text-center text-white bg-indigo-950"
    :style="`
      transform: translateY(${heightCalendarTitle}px);
      width: ${widthCalendarAside}px;
      height: ${heightCalendarRow}px`"
  >
    {{ title }}
  </div>
</template>
<style>
.fixed-column {
  position: sticky;
  left: 0;
  z-index: 1;
}
</style>
