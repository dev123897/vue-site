<script setup>
import {ref} from 'vue'
import Alert from './Alert.vue'
import Badge from './Badge.vue'

const emit = defineEmits(['delete-alert'])
const props = defineProps({
  alerts: {
    type: Array,
    required: true,
  }
})

function closeAlert(i) {
  emit('delete-alert', i)
}
</script>

<template>
  <div class="absolute top-10 z-40 md:inset-x-1/3">
    <template v-for="(alert, i) in alerts" :key="i">
      <Alert
        containerClass="mt-4"
        @close="closeAlert(i)"
        :type="alert.type"
      >
        <template #badge>
          <Badge :type="alert.type">{{alert.badgeMsg}}</Badge>
        </template>
        <p class="font-semibod mr-2 text-left">{{alert.msg}}</p>
      </Alert>
    </template>
  </div>
</template>
