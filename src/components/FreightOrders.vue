<script setup>
import Table from './core/Table.vue'
import { required } from '@vuelidate/validators'

const table = {
  route: '/freight_resource',
  title: 'Freight Orders',
  disallowPost: true,
  disallowDelete: true,
  headers: [
    {
      name: 'id',
      readonly: true,
      primaryKey: true,
    },
    {
      name: 'received',
      type: 'boolean',
      readonly: true
    },
    {
      name: 'sent',
      type: 'boolean'
    },
    {
      name: 'freightCompanyId',
      altName: 'Freight Company',
      display: 'freightCompany',
      type: 'dropdown',
      dropdownOptions: 'freight_companies_resource?limit=0',
      valueKey: 'id',
      nameKey: 'name'
    },
    {
      name: 'warehouseCode',
      altName: 'Warehouse Code',
      readonly: true
    }
  ],
  validation: {
    freightCompanyId: { required }
  }
}
</script>

<template>
  <Table :table="table" />
</template>
