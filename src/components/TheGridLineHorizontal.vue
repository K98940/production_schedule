<script setup lang="ts">
defineProps<{
  y1: number
}>()

const colorDark = 'rgba(200, 200, 200, 1)'
const widthStroke = 2
</script>

<template>
  <slot></slot>
  <svg
    class="svg-grid-line"
    :style="`transform: translate(${widthStroke}px, ${y1}px); height: ${widthStroke}px); width: calc(100% - ${widthStroke}px)`"
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
.svg-grid-line {
  position: absolute;
  pointer-events: none;
  user-select: none;
}
</style>
