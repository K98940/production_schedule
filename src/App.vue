<script setup lang="ts">
import ViewCalendar from './views/ViewCalendar.vue'
import { handleMouseUp } from './handlers/handleMouseUp'
import { handleMouseMove } from './handlers/handleMouseMove'
</script>

<template>
  <div
    class="app-container"
    @mouseup="handleMouseUp"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseUp"
  >
    <ViewCalendar />
  </div>
</template>

<style>
.app-container {
  height: 100dvh;
  padding-inline: 1rem;
  padding-block-start: 10rem;
  background-color: rgb(255, 255, 239);
}
</style>
