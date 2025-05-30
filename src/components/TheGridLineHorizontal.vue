<script setup lang="ts">
import { widthCalendarAside } from '@/constants/constants'
import { useCalendarStore } from '@/store/calendar'

defineProps<{
  y1: number
}>()

const calendar = useCalendarStore()

const colorDark = 'rgba(200, 200, 200, 1)'
const widthStroke = 2
const widhScrollbar = 16
</script>

<template>
  <slot></slot>
  <svg
    class="svg-grid-line-hz"
    :style="`transform: translate(${widthStroke}px, ${y1}px);
     height: ${widthStroke}px);
     width: ${(calendar.columnWidth || 0) * calendar.hours.length + widhScrollbar + widthCalendarAside}px`"
  >
    <g>
      <line
        :x1="0"
        :y1="0"
        x2="100%"
        :y2="widthStroke"
        :stroke="colorDark"
        :stroke-width="widthStroke"
      />
    </g>
  </svg>
</template>
<style>
.svg-grid-line-hz {
  position: absolute;
  pointer-events: none;
  user-select: none;
  width: 200%;
}
</style>
