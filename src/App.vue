<script setup lang="ts">
import ViewTopMenu from './views/ViewTopMenu.vue'
import ViewCalendar from './views/ViewCalendar.vue'
import { handleMouseUp } from './handlers/handleMouseUp'
import { handleMouseMove } from './handlers/handleMouseMove'
</script>

<template>
  <div
    class="flex grow flex-col h-full p-4 bg-amber-50"
    @mouseup="handleMouseUp"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseUp"
  >
    <ViewTopMenu />
    <ViewCalendar />
  </div>
</template>
