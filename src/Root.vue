<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const useAuth = useAuthStore()
onMounted(() => {
  useAuth.initAuthStore()
})
</script>

<template>
  <notifications />
  <RouterView v-slot="{ Component, route }">
    <Transition name="slide">
      <component :is="Component" :key="route" />
    </Transition>
  </RouterView>
</template>
