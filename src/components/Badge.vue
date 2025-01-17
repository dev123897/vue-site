<script setup>
import {computed} from 'vue'
const props = defineProps(['class', 'type'])

const isError = computed(() => props.type === 'error' ? 'bg-red-500' : 'bg-salmon-10')
</script>

<template>
  <span
    class="flex rounded-full uppercase px-2 py-1 text-xs font-bold mr-3"
    :class="isError"
  >
    <slot />
  </span>
</template>
