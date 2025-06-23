<script setup lang="ts">
import { heightCalendarTitle, widthStroke, workTime } from '@/constants/constants'
import { useCalendarStore } from '@/store/calendar'
import { computed } from 'vue'

const props = defineProps<{
  x1: number
  text: string
  day: string
}>()

const calendar = useCalendarStore()
const borderWidth = 0
const colorDark = 'rgba(180, 180, 180, 1)'
const colorLight = 'rgba(200, 200, 200, 0.25)'
const calcBgColor = (time: string): string => {
  const isWorkTime = workTime.includes(time)
  return isWorkTime ? 'bg-emerald-50' : 'bg-stone-200'
}
const startDay = computed(() => props.x1 + 3)
const finishDay = computed(() => (calendar.columnWidth || 0) * 24 - 3)
</script>

<template>
  <svg
    v-if="text == '00'"
    class="bg-emerald-50 border-b-1 border-stone-400"
    :style="`z-index: 1; position: absolute; transform: translate(${startDay}px, 0px); height: 2rem; width: ${finishDay}px;`"
  >
    <text x="50%" :y="25" font-size="20" text-anchor="middle">
      {{ day }}
    </text>
  </svg>
  <svg
    :class="`svg-grid-line ${calcBgColor(text)}`"
    :style="`transform: translate(${x1}px, 0px); height: calc(100% - ${borderWidth}px); width: ${calendar.columnWidth || 0}px`"
  >
    <g>
      <line
        :x1="widthStroke"
        :y1="text == '00' ? 0 : heightCalendarTitle"
        y2="100%"
        :stroke="text == '00' ? colorDark : colorLight"
        :stroke-width="widthStroke"
      />
      <text :x="(calendar.columnWidth || 0) / 2 - 6" :y="heightCalendarTitle / 1.15" font-size="12">
        {{ text }}
      </text>
    </g>
  </svg>
</template>
<style>
.svg-grid-line {
  position: absolute;
  pointer-events: none;
  user-select: none;
}
</style>
