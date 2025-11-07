<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { name } = defineProps<{ name: string }>()
const { schema } = schemaFolder()
const { add } = useToast()
const { updateFolder } = useFolder()

const emit = defineEmits(['close'])

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: name,
})

async function onUpdated(event: FormSubmitEvent<Schema>) {
  const { data, error } = await updateFolder({ oldName: name, newName: event.data.name })

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
}

async function onBack() {
  emit('close')
}
</script>

<template>
  <UModal title="Update" description="edit existing folder" class="p-6" :dismissible="false">
    <template #content>
      <UForm :schema="schema" :state="state" @submit="onUpdated">
        <div class="gap-2 pb-8">
          <h1 class="text-xl font-semibold">Update</h1>
          <h3 class="text-base font-normal">edit existing folder</h3>
        </div>
        <div class="flex flex-col gap-5 pb-16">
          <UFormField name="name" label="Name">
            <UInput class="w-full" v-model="state.name" tabindex="-1" />
          </UFormField>
        </div>
        <div class="flex w-full justify-between">
          <UButton label="Back" variant="soft" color="neutral" @click="onBack" />
          <UButton label="Save" type="submit" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
