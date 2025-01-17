<script setup>
import Table from './core/Table.vue'
import { required } from '@vuelidate/validators'

const table = {
  route: '/warehouse_resource',
  title: 'Warehouses',
  headers: [
    {
      name: 'id',
      readonly: true,
      primaryKey: true
    },
    {
      name: 'trackingCode',
      altName: 'Tracking Code'
    },
    {
      name: 'freightId',
      type: 'dropdown',
      dropdownOptions: 'freight_resource?limit=0',
      valueKey: 'id',
      nameKey: 'id'
    },
    {
      name: 'sent',
      type: 'boolean'
    }
  ],
  validation: {
    trackingCode: {
      required,
    },
    sent: { required }
  }
}
</script>

<template>
  <Table :table="table" />
</template>
