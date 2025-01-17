<script setup>
import {ref} from 'vue'
import Table from './core/Table.vue'
import axios from '../tools/axios.js'
import { io } from 'socket.io-client'

let tableData = ref([])
let alertMsg = ref('')
let intervalId

const socket = io(import.meta.env.VITE_SOCKET_SERVER, {
  reconnectionAttempts: 5,
})

socket.on('connect', () => {
  intervalId = setInterval(() => socket.emit('refresh_cdrs'), 1000)
  console.log('connection established')
})

socket.on('data', data => { tableData.value = data })

socket.on('disconnect', (reason, details) => {
  clearInterval(intervalId)
  alertMsg.value = 'disconnected from live data server'
})

socket.on('connect_error', error => {
  if (!socket.active) {
    // the connection was denied by the server
    console.log(error.message)
    alertMsg.value = error.message
  }
  // else temporary failure, the socket will automatically try to reconnect
})

const table = {
  title: 'Real Time Data',
  disallowPost: true,
  disableEditing: true,
  disableSearch: true,
  headers: [
    {
      name: 'trunk',
    },
    {
      name: 'cc',
    },
    {
      name: 'avgDuration',
    },
    {
      name: 'longestConcurrentCall',
    },
    {
      name: 'date',
    },
    {
      name: 'longestCall',
    },
    {
      name: 'dt',
    },
    {
      name: 'lcr',
    }
  ]
}
</script>

<template>
  <Table :table="table" :tableData="tableData" :alertMsg="alertMsg"/>
</template>
