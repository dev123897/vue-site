<script setup>
import Welcome from '@/components/Welcome.vue'
import NavBar from '@/components/NavBar.vue'
import SideBarMenu from '@/components/SideBarMenu.vue'
import FooterContent from '@/components/FooterContent.vue'
import AccountActions from '@/components/AccountActions.vue'

const links = {
  'Github': 'https://github.com/dev123897',
}
</script>

<template>
  <NavBar>
    <template #home>
      <span class="font-semibold text-xl tracking-tight">
        Vue.js demo site
      </span>
    </template>
    <!-- template #accountActions>
      <AccountActions />
    </template -->
  </NavBar>
  <div class="md:grid md:grid-rows-4 md:grid-cols-6 h-full text-sleet-30 bg-midnight-30">
    <div class="md:row-start-1 md:row-span-4 md:col-span-full md:grid md:grid-cols-subgrid md:gap-2">
      <div class="col-start-1 col-span-1">
        <SideBarMenu />
      </div>
      <!-- Content -->
      <div class="md:col-start-2 md:col-span-5 pt-5 px-2">
        <Welcome v-if="$route.fullPath === '/'"/>
        <RouterView />
      </div>
    </div>
  </div>
  <FooterContent>
    <h1 class="py-5 font-bold">Portfolio</h1>
    <hr class="max-w-[calc(100%/3)] m-auto">
    <ul>
      <li v-for="(value, key, i) in links" class="pt-5">
        <a :href="value">{{key}}</a>
      </li>
    </ul>
  </FooterContent>
</template>
