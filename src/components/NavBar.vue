<script setup>
defineProps({
  routes: { type: Array, default: [] },
  navClass: String,
  homeClass: String,
  linkListClass: String,
  linkClass: String
})
</script>

<template>
  <!-- Anchor absolute elements relative to the navbar at least -->
  <nav class="static flex items-center justify-between flex-wrap bg-midnight-20 p-4" :class="navClass">
    <div class="flex items-center flex-shrink-0 text-salmon-30 mr-6" :class="homeClass">
      <RouterLink to="/">
        <slot name="home" />
      </RouterLink>
    </div>
    <div class="static w-full block flex-grow lg:flex lg:items-center lg:w-auto" :class="linkListClass">
      <div class="text-sm lg:flex-grow">
        <RouterLink
          v-for="(route, i) in routes"
          :to="route.to"
          class="block mt-4 lg:inline-block lg:mt-0 text-sleet-10 hover:text-white mr-4"
          :class="linkClass"
        >
          {{route.description}}
        </RouterLink>
      </div>
      <slot name="accountActions" />
    </div>
  </nav>
</template>
