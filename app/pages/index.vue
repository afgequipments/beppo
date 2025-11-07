<script lang="ts" setup>
definePageMeta({
  layout: false,
})

const { data: page } = await useAsyncData('index', () => queryCollection('landing').path('/').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <ContentRenderer v-if="page" :value="page" :prose="false" />
</template>
