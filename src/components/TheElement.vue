<script setup lang="ts">
defineProps<{
  id: number
  coordX: number
  coordY: number
  width: number
  height: number
  title: string
}>()

const borderWidth = 4
const emit = defineEmits<{
  (ev: 'down', id: number, startX: number, startY: number): void
  (ev: 'up', e: MouseEvent): void
  (ev: 'move', e: MouseEvent): void
}>()
</script>

<template>
  <svg
    class="svg"
    :style="`transform: translate(${coordX}px, ${coordY}px); height: ${height + borderWidth}px; width: ${width + borderWidth}px`"
    @mousedown="(e) => emit('down', id, e.clientX - coordX, e.clientY - coordY)"
    @mouseup="(e) => emit('up', e)"
    @mousemove="(e) => emit('move', e)"
  >
    <g>
      <rect :width="`${width}px`" :height="`${height}px`" x="1" y="1" fill="red" rx="10" />
      <text x="10px" y="20px" font-size="14" fill="white" font-weight="bolder" text-anchor="start">
        {{ title }}
      </text>
    </g>
  </svg>
</template>
<style>
.svg {
  position: absolute;
  inset: 0;
  border: 1px solid rgb(188, 29, 29);
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
}
</style>
