<script setup lang="ts">
import ViewTopMenu from './views/ViewTopMenu.vue'
import ViewCalendar from './views/ViewCalendar.vue'
import { handleMouseUp } from './handlers/handleMouseUp'
import { handleMouseMove } from './handlers/handleMouseMove'
//TODO вернуть названия к нашему примеру
//TODO 4. Сделать дебонс 500мс на 5px с прилипанием к соседней карточке.
//TODO 5. При mouseup изменения записываются в данные
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
