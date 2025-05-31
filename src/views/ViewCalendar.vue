<script setup lang="ts">
import { useCalendarStore } from '@/store/calendar'
import { useDataStore } from '@/store/data'
import TheGridLineVertical from '@/components/TheGridLineVertical.vue'
import TheElement from '@/components/TheElement.vue'
import { onMounted, ref } from 'vue'
import { handleMouseUp } from '@/handlers/handleMouseUp'
import { handleMouseMove } from '@/handlers/handleMouseMove'
import { handleMouseDown } from '@/handlers/handleMouseDown'
import TheGridLineHorizontal from '@/components/TheGridLineHorizontal.vue'
import { heightCalendarRow, heightCalendarTitle } from '@/constants/constants'
import TheLeftSide from '@/components/TheLeftSide.vue'

const calendar = useCalendarStore()
const data = useDataStore()

const contextCalendar = ref<HTMLDivElement | null>(null)

onMounted(() => {
  calendar.nodeContext = contextCalendar.value
  calendar.grid = calendar.getGridData
})
</script>
<template>
  <div class="scroll flex flex-col grow border-slate-400 border-3 rounded-md overflow-auto">
    <div class="relative shrink-0" ref="contextCalendar">
      <TheGridLineVertical
        v-for="line in calendar.grid"
        :key="line.text"
        :text="line.text"
        :x1="line.x1"
      />
      <TheGridLineHorizontal :y1="heightCalendarTitle" />

      <TheGridLineHorizontal
        v-for="(device, indexDevice) in data.tasks"
        :key="device[0].deviceID"
        :y1="(indexDevice + 1) * heightCalendarRow + heightCalendarTitle"
      >
        <TheElement
          v-for="(task, indexTask) in device"
          :key="task.id"
          :id="task.id"
          :index-device="indexDevice"
          :index-task="indexTask"
          :coord-x="task.coordX"
          :coord-y="task.coordY"
          :width="task.width"
          :height="task.height"
          :title="task.title"
          @down="handleMouseDown"
          @up="handleMouseUp"
          @move="handleMouseMove"
        />
      </TheGridLineHorizontal>
      <TheLeftSide />
    </div>
  </div>
</template>
<style>
p {
  user-select: none;
}
</style>
