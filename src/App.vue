<script setup lang="ts">
import ViewTopMenu from './views/ViewTopMenu.vue'
import ViewCalendar from './views/ViewCalendar.vue'
import { handleMouseUp } from './handlers/handleMouseUp'
import { handleMouseMove } from './handlers/handleMouseMove'
//FIX 5. Интервал один день. Иногда ширина контейнера превышает ширину окна,
// примерно на ширину левой панели. Смотреть условие ширина колонки < чего-то там.
// В калькуляции координат в календаре.
</script>

<template>
  <div
    class="flex grow flex-col h-full p-4 bg-purple-500"
    @mouseup="handleMouseUp"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseUp"
  >
    <ViewTopMenu />
    <ViewCalendar />
  </div>
</template>
