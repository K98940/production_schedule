<script setup lang="ts">
import { widthCalendarColumn } from '@/constants/constants'

defineProps<{
  x1: number
  text: string
}>()

const topPadding = 30
const borderWidth = 0
const colorDark = 'rgba(200, 200, 200, 1)'
const colorLight = 'rgba(200, 200, 200, 0.25)'
const widthStroke = 2
</script>

<template>
  <svg
    class="svg-grid-line"
    :style="`transform: translate(${x1}px, 0px); height: calc(100% - ${borderWidth}px); width: ${widthCalendarColumn}px`"
  >
    <g>
      <line
        :x1="widthCalendarColumn / 2"
        :y1="topPadding"
        :x2="widthCalendarColumn / 2"
        y2="100%"
        :stroke="text == '0' ? colorDark : colorLight"
        :stroke-width="widthStroke"
      />
      <text :x="widthCalendarColumn / 2" :y="topPadding / 1.5" font-size="12" text-anchor="middle">
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
