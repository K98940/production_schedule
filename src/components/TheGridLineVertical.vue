<script setup lang="ts">
import { widthStroke, workTime } from '@/constants/constants'
import { useCalendarStore } from '@/store/calendar'

defineProps<{
  x1: number
  text: string
}>()

const calendar = useCalendarStore()
const topPadding = 30
const borderWidth = 0
const colorDark = 'rgba(200, 200, 200, 1)'
const colorLight = 'rgba(200, 200, 200, 0.25)'
const calcBgColor = (time: string): string => {
  const isWorkTime = workTime.includes(time)
  return isWorkTime ? 'bg-emerald-50' : 'bg-stone-200'
}
</script>

<template>
  <svg
    :class="`svg-grid-line ${calcBgColor(text)}`"
    :style="`transform: translate(${x1}px, 0px); height: calc(100% - ${borderWidth}px); width: ${calendar.columnWidth || 0}px`"
  >
    <g>
      <line
        :x1="widthStroke"
        :y1="topPadding"
        y2="100%"
        :stroke="text == '0' ? colorDark : colorLight"
        :stroke-width="widthStroke"
      />
      <text :x="(calendar.columnWidth || 0) / 2" :y="topPadding / 1.5" font-size="12">
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
