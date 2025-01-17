<script setup>
defineProps(['class'])
defineEmits(['click'])
</script>

<template>
  <button
    class="bg-midnight-10 hover:bg-midnight-15 active:bg-midnight-20 focus:outline-none focus:ring focus:ring-midnight-10 active:shadow-xl text-sleet-10 font-semibold py-2 px-4 rounded-full"
    :class="class"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
