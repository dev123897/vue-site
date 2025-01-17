<script setup>
import Table from './core/Table.vue'

const table = {
  route: '/files_resource',
  title: 'File streams',
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
      name: 'date',
    },
    {
      name: 'companyId',
    },
    {
      name: 'file',
      type: 'download',
      src: '/files/download',
      param: 'id'
    }
  ]
}
</script>

<template>
  <Table :table="table" />
</template>
