<script setup lang="ts">
</script>

<template>
  <notifications />
  <RouterView v-slot="{ Component, route }">
    <Transition name="slide">
      <component :is="Component" :key="route" />
    </Transition>
  </RouterView>
</template>
