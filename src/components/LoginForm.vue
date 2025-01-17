<script setup>
import Button from './Button.vue'
import Card from './Card.vue'
import Input from './Input.vue'
</script>

<template>
  <Card containerClass="md:fixed md:top-1/4 md:right-[40%] w-full" class="md:px-14 md:pt-14 md:min-w-56">
    <p class="text-sm text-violet-500 items-center">
      Sign in or create an account.
    </p>
    <div class="flex flex-col">
      <Input displayname="User Name" class="mb-2"/>
      <Input displayname="Password" type="password" />
      <RouterLink to="/" class="block mt-4 pt-4 space-y-lg:inline-block lg:mt-0 text-violet-500 hover:text-violet-900 mr-4">
        Forgot password?
      </RouterLink>
      <Button class="">
        Log in
      </Button>
      <RouterLink to="/sign-up" class="block mt-4 lg:inline-block lg:mt-0 text-violet-500 hover:text-violet-900 mr-4">
        Don't have an account? Sign Up.
      </RouterLink>
    </div>
  </Card>
</template>
