<script setup lang="ts">
import ViewTopMenu from './views/ViewTopMenu.vue'
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
    <ViewTopMenu />
    <ViewCalendar />
  </div>
</template>

<style>
.app-container {
  height: 100dvh;
  padding-inline: 1rem;
  padding-block-start: 5rem;
  background-color: rgb(255, 255, 239);
}
</style>
