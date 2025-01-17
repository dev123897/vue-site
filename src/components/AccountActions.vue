<script setup>
import Card from './Card.vue'
import DropDown from './DropDown.vue'
</script>

<template>
  <DropDown>
    <template #buttonInnerContent>
      ☺
    </template>
    <template #default>
      <Card containerClass="absolute md:top-13 md:right-2">
        <RouterLink to="/signout">
          Sign Out
        </RouterLink>
      </Card>
    </template>
  </DropDown>
</template>
