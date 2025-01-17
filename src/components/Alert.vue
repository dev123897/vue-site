<script setup>
import {computed} from 'vue'
const props = defineProps(['containerClass', 'alertClass', 'closeClass', 'type'])
defineEmits(['close'])

const isError = computed(() => props.type === 'error')
</script>

<template>
  <div
    class="bg-salmon-30 text-center py-4 lg:px-4 text-blue-900 inline-block rounded"
    :class="[{'bg-red-900': isError, 'text-red-100': isError}, containerClass]"
  >
    <div class="flex">
      <div
        class="flex-nowrap p-2 bg-salmon-20 items-center leading-none lg:rounded-full flex lg:inline-flex min-w-80"
        :class="[{'bg-red-800': isError}, alertClass]"
        role="alert"
      >
        <slot name="badge" />
        <!-- default slot for message and/or content -->
        <slot/>
      </div>
      <slot name="close">
        <button
          @click="$emit('close')"
          class="px-3 py-1 ml-2 hover:bg-salmon-40 rounded"
          :class="[{'hover:bg-red-950': isError}, closeClass]"
        >
          X
        </button>
      </slot>
    </div>
  </div>
</template>
