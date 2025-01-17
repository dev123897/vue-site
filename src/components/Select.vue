<script setup>
defineProps(['options', 'selected', 'value-key', 'name-key'])
defineEmits(['change'])
</script>

<template>
  <select
    @change="$emit('change', $event.target.value)"
    class="bg-midnight-10 focus:ring focus:ring-midnight-20 active:shadow-xl text-sleet-10 font-semivold rounded-full py-2 px-4"
  >
    <option value="">--- Select a value ---</option>
    <option
      v-for="(opt, i) in options"
      :key="i"
      :value="opt[valueKey]"
      :selected="opt[valueKey] === selected"
    >
      {{opt[nameKey]}}
    </option>
  </select>
</template>
