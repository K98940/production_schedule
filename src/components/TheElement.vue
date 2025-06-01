<script setup lang="ts">
import { heightCalendarRow, heightCalendarTitle } from '@/constants/constants'
import { calcCardMoving } from '@/hooks/calcCardMoving'
import { getDateFinishFormatted } from '@/hooks/getDateFinishFormatted'
import { getDateStartFormatted } from '@/hooks/getDateStartFormatted'
import { useCommonStore } from '@/store/common'
import { ref } from 'vue'

defineProps<{
  id: number
  indexDevice: number
  indexTask: number
  coordX: number
  coordY: number
  width: number
  height: number
  title: string
  duration: number
}>()

export type MouseDownProps = {
  startX: number
  startY: number
  indexDevice: number
  indexTask: number
  idTask: number
}

const emit = defineEmits<{
  (ev: 'down', props: MouseDownProps): void
  (ev: 'up', e: MouseEvent): void
  (ev: 'move', e: MouseEvent): void
  (ev: 'openCardDialog', indexDevice: number, indexTask: number): void
}>()

const common = useCommonStore()
const popover = ref<HTMLDivElement | null>()
const popoverShiftY = heightCalendarRow + 5
</script>

<template>
  <svg
    class="svg"
    :style="`transform: translate(${coordX}px, ${coordY}px); height: ${height}px; width: ${width}px`"
    @dblclick="$emit('openCardDialog', indexDevice, indexTask)"
    @mousedown="
      (e) => {
        emit('down', {
          startX: e.clientX - coordX,
          startY: e.clientY - coordY,
          idTask: id,
          indexDevice,
          indexTask,
        })
        calcCardMoving(e)
      }
    "
    @mouseup="
      (e) => {
        emit('up', e)
      }
    "
    @mousemove="
      (e) => {
        calcCardMoving(e)
        emit('move', e)
      }
    "
  >
    <g>
      <rect
        :width="`${width}px`"
        :height="`${height}px`"
        fill="oklch(59.6% 0.145 163.225)"
        rx="7"
      />
      <text x="10px" y="20px" font-size="14" fill="white" font-weight="bolder" text-anchor="start">
        {{ title }}
      </text>
    </g>
  </svg>
  <div
    ref="popover"
    :class="`absolute z-2 overflow-hidden border-green-600 rounded-md  bg-yellow-100
    ${common.idTask == id ? 'border-1 p-2' : 'border-0 p-0'}`"
    :style="`height: ${common.idTask == id ? 'auto' : '0px'};
     left: ${coordX}px;
     transform: translateY(${
       coordY - popoverShiftY <= 0
         ? heightCalendarTitle + heightCalendarRow
         : coordY - popoverShiftY
     }px)`"
  >
    <p class="px-4 py-1 text-m">Начало: {{ getDateStartFormatted() }}</p>
    <p class="px-4 py-1 text-m">Конец: {{ getDateFinishFormatted(duration) }}</p>
  </div>
</template>
<style>
.svg {
  position: absolute;
  inset: 0;
  border: 1px solid oklch(21% 0.034 264.665);
  border-radius: 7px;
  cursor: pointer;
  user-select: none;
}
</style>
