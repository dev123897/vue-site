<script setup>
import {ref} from 'vue'

defineProps(['containerClass', 'buttonClass'])

const emit = defineEmits(['click'])

let activate = ref(false)

function handleClick() {
  activate.value = !activate.value
  emit('click')
}
</script>

<template>
  <div :class="containerClass">
    <button
      id="dropdown-button"
      class="bg-transparent border border-blue-400"
      :class="buttonClass"
      @click="handleClick"
    >
      <slot name="buttonInnerContent">
        ☰
      </slot>
    </button>
    <slot v-if="activate" />
  </div>
</template>
