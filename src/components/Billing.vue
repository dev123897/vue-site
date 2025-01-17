<script setup>
import Table from './core/Table.vue'
import axios from '../tools/axios.js'

const table = {
  route: '/billing_resource',
  title: 'Billing Records',
  disallowPost: true,
  disallowDelete: true,
  disableEditing: true,
  enableRowSelect: true,
  disableSearch: true,
  headers: [
    {
      name: 'id',
      readonly: true,
      primaryKey: true,
    },
    {
      name: 'total',
    },
    {
      name: 'amountReceived',
    },
    {
      name: 'billDate',
    },
    {
      name: 'paymentDate',
    },
    {
      name: 'billDueDate',
    },
    {
      name: 'companyId',
    },
    {
      name: 'file',
      type: 'download',
      src: '/billing/download',
      param: 'id'
    }
  ]
}
</script>

<template>
  <Table :table="table" />
</template>
