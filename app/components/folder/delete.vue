<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { name } = defineProps<{ name: string }>()
const { schema } = schemaFolder()
const { add } = useToast()
const { deleteFolder } = useFolder()

const emit = defineEmits(['close'])

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
})

async function onUpdated(event: FormSubmitEvent<Schema>) {
  if (event.data.name === 'delete') {
    const { data, error } = await deleteFolder({ name })

    if (data) {
      add({
        title: 'Success',
        color: 'success',
      })
    }

    if (error) {
      add({
        title: 'Error',
        description: error,
        color: 'error',
      })
    }

    emit('close')
  } else {
    add({
      title: 'Error',
      description: 'Input is incorrect. Deletion cancelled.',
      color: 'error',
    })
  }
}

async function onBack() {
  emit('close')
}
</script>

<template>
  <UModal title="Delete" description="confirm delete folder" class="p-6" :dismissible="false">
    <template #content>
      <UForm :schema="schema" :state="state" @submit="onUpdated">
        <div class="flex flex-col gap-5 pb-16">
          <UAlert color="error" variant="subtle" description="This action cannot be undone" icon="i-lucide-triangle-alert" />
          <p>This will permanently delete the folder and all of its requests. Type <b>delete</b> to confirm</p>
          <UFormField name="name">
            <UInput class="w-full" v-model="state.name" tabindex="-1" />
          </UFormField>
        </div>
        <div class="flex w-full justify-between">
          <UButton label="Back" variant="soft" color="neutral" @click="onBack" />
          <UButton label="Yes, Delete" type="submit" color="error" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
