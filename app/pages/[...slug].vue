<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Edit',
    icon: 'i-lucide-pencil',
  },
  {
    label: 'Delete',
    icon: 'i-lucide-trash',
    color: 'error',
  },
])

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path).first())
if (!page.value?.title) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docs', route.path)
})

function isNotIntro() {
  return route.path !== '/docs'
}
</script>

<template>
  <UPage v-if="page">
    <UPageHeader>
      <template #title>
        <div class="flex flex-row items-center gap-4">
          <UBadge v-if="page.method" variant="soft" class="h-fit" size="xl" :label="page.method.toString()" :color="getMethodColor(page.method.toString())" />
          <p>{{ page.title }}</p>
        </div>
      </template>
      <template #description>
        <p>{{ page.description }}</p>
      </template>
      <template #links>
        <UDropdownMenu :items="items" v-if="isNotIntro()">
          <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
        </UDropdownMenu>
      </template>
    </UPageHeader>
    <UPageBody v-if="isNotIntro()">
      <ContentRenderer :value="page" />
      <USeparator />
      <UContentSurround :surround="surround" />
    </UPageBody>
    <template #right>
      <UContentToc title="Table of Contents" :links="page.body.toc?.links" />
    </template>
  </UPage>
</template>
