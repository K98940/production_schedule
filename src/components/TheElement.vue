<script setup lang="ts">
import { heightCalendarRow, heightCalendarTitle } from '@/constants/constants'
import { calcCardMoving } from '@/hooks/calcCardMoving'
import { getDateFinishFormatted } from '@/hooks/getDateFinishFormatted'
import { getDateStartFormatted } from '@/hooks/getDateStartFormatted'
import { useCommonStore } from '@/store/common'
import { computed, ref } from 'vue'

const props = defineProps<{
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
const svgElement = ref<SVGElement | null>(null)
const popoverShiftY = heightCalendarRow + 5

const isActive = computed(() => common.idTask === props.id)

const svgStyle = computed(() => ({
  transform: `translate(${props.coordX}px, ${props.coordY}px)`,
  height: `${props.height}px`,
  width: `${props.width}px`,
  zIndex: isActive.value ? '2' : '0',
  boxShadow: isActive.value ? '5px 3px 6px rgba(0, 0, 0, 0.8)' : '3px 3px 8px rgba(0, 0, 0, 0.5)',
}))

const popoverStyle = computed(() => ({
  height: isActive.value ? 'auto' : '0px',
  left: `${props.coordX}px`,
  transform: `translateY(${
    props.coordY - popoverShiftY <= 0
      ? heightCalendarTitle + heightCalendarRow
      : props.coordY - popoverShiftY
  }px)`,
}))
</script>

<template>
  <svg
    ref="svgElement"
    class="svg"
    :style="svgStyle"
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
    @mouseup="(e) => emit('up', e)"
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
        :fill="`${common.idTask == id && common.isIntersecting ? 'oklch(75% 0.183 55.934)' : 'oklch(59.6% 0.145 163.225)'}`"
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
    ${isActive ? 'border-1 p-2' : 'border-0 p-0'}`"
    :style="popoverStyle"
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
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.2s ease;
  border-radius: 7px;
  cursor: pointer;
  user-select: none;
}
</style>
