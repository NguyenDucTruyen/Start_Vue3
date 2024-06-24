<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { useAuthStore } from '@/stores/auth'
// access the `store` variable anywhere in the component ✨
const store = useCounterStore()
const user = useAuthStore()
</script>

<template>
  <div>
    <span>Name : {{ user.user?.name }}</span>
    <h1> Count : {{ store.count }}</h1>
    <ElButton @click="store.increment">
      Hehe
    </ElButton>
  </div>
</template>
