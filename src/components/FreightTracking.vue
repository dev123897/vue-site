<script setup>
import Table from './core/Table.vue'
import { maxLength, required } from '@vuelidate/validators'

const table = {
  route: '/freight_tracking_resource',
  title: 'Freight Tracking',
  headers: [
    {
      name: 'id',
      readonly: true,
      primaryKey: true
    },
    {
      name: 'name'
    },
    {
      name: 'warehouseTrackingCode',
      altName: 'warehouse Tracking Code'
    },
    {
      name: 'freightId',
      primaryKey: true,
      type: 'dropdown',
      dropdownOptions: 'freight_resource',
      valueKey: 'id',
      nameKey: 'id'
    },
    // {
    //   name: 'companyId'
    // },
    {
      name: 'freightCompanyId',
      altName: 'freight company',
      display: 'freightCompany',
      type: 'dropdown',
      dropdownOptions: 'freight_companies_resource?limit=0',
      valueKey: 'id',
      nameKey: 'name'
    }
  ],
  validation: {
    name: {
      required,
      maxLength: maxLength(255)
    },
    warehouseTrackingCode: { required },
    // companyId: { required },
    freightCompanyId: { required }
  }
}
</script>

<template>
  <Table :table="table" />
</template>
