<script setup lang="ts">
import { widthColumnContainer } from '@/constants/constants'

defineProps<{
  x1: number
  text: string
}>()

const topPadding = 30
const borderWidth = 0
const color = 'rgba(200, 200, 200, 0.5)'
const widthStroke = 2
</script>

<template>
  <svg
    class="svg-grid-line"
    :style="`transform: translate(${x1}px, 0px); height: calc(100% - ${borderWidth}px); width: ${widthColumnContainer}px`"
  >
    <g>
      <line
        :x1="widthColumnContainer / 2"
        :y1="topPadding"
        :x2="widthColumnContainer / 2"
        y2="100%"
        :stroke="color"
        :stroke-width="widthStroke"
      />
      <text :x="widthColumnContainer / 2" :y="topPadding / 1.5" font-size="12" text-anchor="middle">
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
