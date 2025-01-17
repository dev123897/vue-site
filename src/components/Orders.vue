<script setup>
import {ref} from 'vue'
import Table from './core/Table.vue'
import axios from '../tools/axios.js'
import { required } from '@vuelidate/validators'

let loading = ref(false)
let alertMsg = ref('')
let timer

const table = {
  route: '/ordering_resource',
  title: 'Ordering',
  disableEditing: true,
  headers: [
    {
      name: 'freightId',
      primaryKey: true,
      type: 'dropdown',
      dropdownOptions: 'ordering_resource',
      valueKey: 'freightId',
      nameKey: 'freightId'
    },
    {
      name: 'freightCompanyId',
      display: 'freightCompany',
      type: 'dropdown',
      dropdownOptions: 'freight_companies_resource?limit=0',
      valueKey: 'id',
      nameKey: 'name'
    }
  ],
  callbacks: {
    post: (res, emitDone) => {
      loading.value = true
      timer = setInterval((res) => { // Begin polling
        axios.get(res.headers.location.split('/v1')[1])
          .then(res => {
            if (res.status === 200) {
              if (res.data.status === 'canceled') {
                loading.value = false
                clearInterval(timer)
                alertMsg.value = 'request has been canceled'
              }
              else if (res.data.status === 'complete') {
                // In the browser, axios will follow redirects even if maxRedirects: 0.
                // The fulfilled order message will actually come from the polling url due to the redirect being followed and thus there is no point in hitting the result url for polling.
                loading.value = false
                clearInterval(timer)
                emitDone()
                alertMsg.value = { msg: res.data.message, type: 'info' } // todo-refactor alertMsg in table.vue. right now, errors are sent as strings but this is sent as object
              }
              else {/*status is pending, continue with polling*/}
            }
          })
          .catch(e => {
            loading.value = false
            emitDone()
            console.error(e)
          })
      }, 30000, res)
    }
  },
  validation: {
    freightId: { required },
    freightCompanyId: { required }
  }
}
</script>

<template>
  <p>
    Ordering is where you assign freight to a shipping company.<br>
    The process is asynchronous and the web app communicates with a polling api to fulfill the request.<br>
    Once the order is complete, the freight will be assigned at
    <RouterLink to="/freight" class="text-violet-500 hover:text-violet-900">
      Freight
    </RouterLink>
  </p>
  <br>
  <Table :table="table" :alertMsg="alertMsg" :loading="loading" />
</template>
