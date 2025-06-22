<script setup lang="ts">
defineEmits(['changeDate'])
</script>

<template>
  <button @click="$emit('changeDate')">
    <span class="text-xl cursor-pointer">Неделя</span>
  </button>
</template>
