<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'
import type { ContentNavigationItem } from '@nuxt/content'
import { FolderCreate, FolderUpdate, FolderDelete } from '#components'

const { create } = useOverlay()

function items(link: ContentNavigationItem): DropdownMenuItem[] {
  const name = link.title as string

  return [
    {
      label: 'Update',
      icon: 'i-lucide-pencil',
      onSelect() {
        updateFolder({ name })
      },
    },
    {
      label: 'Delete',
      icon: 'i-lucide-trash',
      color: 'error',
      onSelect() {
        deleteFolder({ name })
      },
    },
  ]
}

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

function getMenu() {
  if (navigation?.value) {
    // remove docs.md title from menu
    return navigation.value.filter((v) => {
      if (v.children) {
        // remove index.md from menu
        const children = v.children.filter((w) => w.stem !== `${v.title}/index`)
        v.children = children
      }

      if (v.path !== '/docs') {
        return v
      }
    })
  }
  return []
}

async function createFolder() {
  const modal = create(FolderCreate)
  await modal.open()
}

async function updateFolder({ name }: { name: string }) {
  const modal = create(FolderUpdate, { props: { name } })
  await modal.open()
}

async function deleteFolder({ name }: { name: string }) {
  const modal = create(FolderDelete, { props: { name } })
  await modal.open()
}
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UPageAside>
          <template #top>
            <UButton icon="i-lucide-plus" label="Add New Folder" @click="createFolder()" />
          </template>
          <UContentNavigation highlight :navigation="getMenu()" :collapsible="false">
            <template #link-leading="{ link }">
              <UBadge v-if="link.method" variant="soft" size="xs" :label="link.method.toString()" :color="getMethodColor(link.method.toString())" />
            </template>
            <template #link-title="{ link }">
              <p>{{ link.title }}</p>
            </template>
            <template #link-trailing="{ link }">
              <UTooltip v-if="link.children" text="Add New Request" :delay-duration="0">
                <UButton icon="i-lucide-plus" size="xs" color="neutral" variant="ghost" />
              </UTooltip>
              <UDropdownMenu v-if="link.children" :items="items(link)">
                <UButton icon="i-lucide-ellipsis-vertical" size="xs" color="neutral" variant="ghost" />
              </UDropdownMenu>
            </template>
          </UContentNavigation>
        </UPageAside>
      </template>
      <slot></slot>
    </UPage>
  </UContainer>
</template>
