<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TheElement from './components/TheElement.vue'
import { useCalendarStore } from './store/calendar'
import TheGridLineVertical from './components/TheGridLineVertical.vue'
import { useDataStore } from './store/data'

const indexActiveElement = ref(-1)
const startX = ref(0)
const startY = ref(0)
const contextCalendar = ref<HTMLDivElement | null>(null)

const calendar = useCalendarStore()
const data = useDataStore()

onMounted(() => {
  calendar.nodeContext = contextCalendar.value
  calendar.grid = calendar.getGridData
})

const handleMouseDown = (id, x, y) => {
  indexActiveElement.value = data.tasks.findIndex((el) => el.id == id)
  startX.value = x
  startY.value = y
}

const handleMouseUp = () => {
  indexActiveElement.value = -1
}

const handleMouseMove = (e: MouseEvent) => {
  if (indexActiveElement.value == -1) return

  const targetElement = data.tasks[indexActiveElement.value]
  let newCoordX = e.clientX - startX.value

  const borderWidth = 4
  const leftElement = data.tasks[indexActiveElement.value - 1] || null
  const rightElement = data.tasks[indexActiveElement.value + 1] || null
  const leftBoundary = leftElement ? leftElement.coordX + leftElement.width + borderWidth : -9999
  const rightBoundary = rightElement
    ? rightElement.coordX - targetElement.width - borderWidth
    : 9999

  if (newCoordX < leftBoundary) {
    newCoordX = leftBoundary + 1
  }
  if (newCoordX > rightBoundary) {
    newCoordX = rightBoundary - 1
  }

  data.tasks[indexActiveElement.value] = {
    ...data.tasks[indexActiveElement.value],
    coordX: newCoordX,
  }
}
</script>

<template>
  <div
    class="app-container"
    @mouseup="handleMouseUp"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseUp"
  >
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
  </div>
</template>

<style>
.app-container {
  height: 100dvh;
  padding-inline: 1rem;
  padding-block-start: 10rem;
  background-color: rgb(255, 255, 239);
}

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
