<script setup>
import {ref} from 'vue'

defineProps(['containerClass', 'listClass', 'listItemClass', 'linkClass'])

let routes = ref([
  {
    path: '/',
    name: 'home',
    icon: '☛'
  },
  //{
  //  path: '/login',
  //  name: 'login',
  //  icon: '☛'
  //},
  {
    path: '/freight_companies',
    name: 'Freight Companies',
    icon: '☛'
  },
  {
    path: '/freight',
    name: 'Freight Orders',
    icon: '☛'
  },
  {
    path: '/warehouses',
    name: 'Warehouses',
    icon: '☛'
  },
  {
    path: '/freight_tracking',
    name: 'Freight Tracking',
    icon: '☛'
  },
  //{
  //  path: '/users',
  //  name: 'users',
  //  icon: '☛'
  //},
  {
    path: '/billing',
    name: 'billing',
    icon: '☛'
  },
  {
    path: '/files',
    name: 'files',
    icon: '☛'
  },
  {
    path: '/realtime',
    name: 'Realtime data',
    icon: '☛'
  },
  {
    path: '/orders',
    name: 'Ordering',
    icon: '☛'
  }
])
</script>

<template>
  <div class="md:grid md:auto-rows-min md:gap-4 h-full text-slate-20 bg-midnight-40" :class="containerClass">
    <ul style="list-style-type: none" class="md:mt-1" :class="listClass">
      <li
        v-for="(route, i) in routes"
        class="hover:bg-midnight-20 mb-2 rounded-md py-2"
        :class="[{'bg-midnight-10': $route.path === route.path}, listItemClass]"
      >
        <span>{{route.icon}}</span>
        <RouterLink
          :id="route.name"
          :to="route.path"
          class="font-fira-sans text-mdd font-medium"
         :class="linkClass"
        >
          {{route.name}}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
