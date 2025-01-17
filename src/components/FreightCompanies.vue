<script setup>
import { ref } from 'vue'
import Table from './core/Table.vue'
import { maxLength, required } from '@vuelidate/validators'

const table = {
  route: '/freight_companies_resource',
  title: 'Freight Companies',
  headers: [
    {
      name: 'id',
      readonly: true,
      primaryKey: true,
    },
    {
      name: 'name'
    }
  ],
  validation: {
    name: {
      required,
      maxLength: maxLength(255)
    }
  }
}
</script>

<template>
  <Table :table="table" />
</template>
