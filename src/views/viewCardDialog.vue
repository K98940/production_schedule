<script setup lang="ts">
import { getDateFormatted } from '@/hooks/getDateFormatted'
import { formatTime } from '@/hooks/getDurationFormatted'
import { getTimeFormatted } from '@/hooks/getTimeFormatted'
import { useDataStore, type Task } from '@/store/data'
import { Dialog, Button } from 'primevue'
import { ref, watch } from 'vue'

const props = defineProps<{
  visible: boolean
  indexDevice: number
  indexTask: number
}>()

const data = useDataStore()
const card = ref<Task>()

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      card.value = data.tasks[props.indexDevice] && data.tasks[props.indexDevice][props.indexTask]
      console.log('card', card.value)
    }

    showDialog.value = newVal
  },
)

defineEmits(['close'])

const showDialog = ref(props.visible)
</script>
<template>
  <Dialog v-model:visible="showDialog" modal>
    <template #header>
      <div class="min-w-xs">
        <h2 class="text-xl font-bold">[{{ card?.id }}] {{ card?.title }}</h2>
      </div>
    </template>
    <template #default>
      <div class="flex gap-4">
        <div>
          <p>Дата начала: {{ getDateFormatted(card?.dateStartISO || '') }}</p>
          <p>Время начала: {{ getTimeFormatted(card?.dateStartISO || '') }}</p>
          <p>Длительность: {{ formatTime(card?.duration || 0) }}</p>
          <p>Устройство: {{ card?.deviceTitle }}</p>
        </div>
        <div>
          <p>Дата окончания: {{ getDateFormatted(card?.dateEndISO || '') }}</p>
          <p>Время окончания: {{ getTimeFormatted(card?.dateEndISO || '') }}</p>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-center w-full">
        <Button @click="$emit('close')">Закрыть</Button>
      </div>
    </template>
  </Dialog>
</template>
