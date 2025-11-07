<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
const { schema } = schemaFolder()
const { add } = useToast()
const { createFolder } = useFolder()

const emit = defineEmits(['close'])

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
})

async function onCreated(event: FormSubmitEvent<Schema>) {
  const { name } = event.data

  const { error } = await createFolder({ name })

  if (error) {
    add({
      title: 'Error',
      description: error,
      color: 'error',
    })
  }

  emit('close')
}

async function onBack() {
  emit('close')
}
</script>

<template>
  <UModal title="Create" description="add new folder" class="p-6" :dismissible="false">
    <template #content>
      <UForm :schema="schema" :state="state" @submit="onCreated">
        <div class="gap-2 pb-8">
          <h1 class="text-xl font-semibold">Create</h1>
          <h3 class="text-base font-normal">add new folder</h3>
        </div>
        <div class="flex flex-col gap-5 pb-16">
          <UFormField name="name" label="Name">
            <UInput class="w-full" v-model="state.name" tabindex="-1" />
          </UFormField>
        </div>
        <div class="flex w-full justify-between">
          <UButton label="Back" variant="soft" color="neutral" @click="onBack" />
          <UButton label="Continue" type="submit" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
