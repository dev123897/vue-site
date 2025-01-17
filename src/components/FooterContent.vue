<script setup>
defineProps(['class'])
</script>

<template>
  <div class="min-h-96 text-center text-sleet-30 bg-midnight-50" :class="class">
    <slot />
  </div>
</template>
