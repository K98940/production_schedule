<script setup lang="ts">
import { useCalendarStore } from '@/store/calendar'
import { useDataStore } from '@/store/data'
import TheGridLineVertical from '@/components/TheGridLineVertical.vue'
import TheElement from '@/components/TheElement.vue'
import { onMounted, ref } from 'vue'
import { handleMouseUp } from '@/handlers/handleMouseUp'
import { handleMouseMove } from '@/handlers/handleMouseMove'
import { handleMouseDown } from '@/handlers/handleMouseDown'

const calendar = useCalendarStore()
const data = useDataStore()

const contextCalendar = ref<HTMLDivElement | null>(null)

onMounted(() => {
  calendar.nodeContext = contextCalendar.value
  calendar.grid = calendar.getGridData
})
</script>
<template>
  <div class="relative board" ref="contextCalendar">
    <TheGridLineVertical
      v-for="line in calendar.grid"
      :key="line.text"
      :text="line.text"
      :x1="line.x1"
    />
    <TheElement
      v-for="(element, i) in data.tasks"
      :key="i"
      :id="element.id"
      :coord-x="element.coordX"
      :coord-y="element.coordY"
      :width="element.width"
      :height="element.height"
      :title="element.title"
      @down="handleMouseDown"
      @up="handleMouseUp"
      @move="handleMouseMove"
    ></TheElement>
  </div>
</template>
<style>
.board {
  height: 50dvh;
  border: 4px solid grey;
  overflow: hidden;
}

p {
  user-select: none;
  font-size: 1.4rem;
}
</style>
