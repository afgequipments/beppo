<script lang="ts" setup>
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs', ['method']).order('title', 'ASC'))

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <UHeader>
      <template #title>
        <p>Beppo</p>
      </template>
      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
    <UFooter />
  </UApp>
</template>
