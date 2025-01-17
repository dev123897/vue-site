<script setup>
defineProps(['containerClass', 'class'])
</script>

<template>
  <div class="max-w-md" :class="containerClass">
    <div class="border border-gray-400 bg-white rounded p-4 justify-between leading-normal" :class="class">
      <div class="mb-8">
        <slot />
      </div>
    </div>
  </div>
</template>
