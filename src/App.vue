<script setup>
import { RouterLink, RouterView } from 'vue-router'
import axios from './tools/axios.js'
import { useAccountStore } from './store/account.js'

const store = useAccountStore()
</script>

<template>
  <!-- w-screen is not needed. Adding it causes overflow with the core/Table.vue component. -->
  <div class="h-screen">
    <RouterView />
  </div>
</template>
