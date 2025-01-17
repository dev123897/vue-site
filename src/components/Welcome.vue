<script setup>
import {ref} from 'vue'
import AlertOutlet from './AlertOutlet.vue'

let alerts = ref([
  { badgeMsg: 'Greetings', msg: 'Welcome to the demo site!', type: 'info' }
])

setTimeout(() => {
  alerts.value.push({ badgeMsg: 'Attention', msg: 'Made with Vue.js and TailwindCSS', type: 'info' })
}, 500);

function closeAlert(i) {
  alerts.value = alerts.value.filter((a, index) => i !== index)
}
</script>

<template>
  <AlertOutlet
    :alerts="alerts"
    @delete-alert="closeAlert"
  />
  <p class="w-full text-center px-20 whitespace-pre-wrap">
    The purpose of this website is to show off various features of Vue.js 3 and TailwindCSS.<br>
    The backend is in Express.js, connected to MariaDB (the server is also connected to a small polling API I made).<br>
    It also serves as a demo common functionality required for most web apps such as file streaming, real time data, sorting and filtering data, etc.<br>
    For obvious reasons, there is no login functionality.<br>
    The project is currently running in a Docker container in AWS.<br>
    The footer of the site contains likes to the other projects i have made that are running in the cloud.<br>
    I look forward to hearing from you!<br>
  </p>

</template>
