<script setup>
defineProps(['displayname', 'class', 'type'])

const value = defineModel('value')
</script>

<template>
  <input
    class="bg-midnight-10 focus:bg-midnight-20 focus:outline-midnight-10 text-sleet-10 py-2 px-4 font-semibold active:shadow-xl rounded-full caret-sleet-50"
    :class="class"
    :placeholder="displayname"
    :type="type"
    v-model="value"
  />
</template>

<style scoped>
::placeholder {
  color: rgb(255 252 235 / var(--tw-text-opacity, 1));
}
</style>
