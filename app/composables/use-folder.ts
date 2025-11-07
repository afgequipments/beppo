export function useFolder() {
  async function createFolder({ name }: { name: string }): Promise<ModelResult> {
    const { data, error } = await useFetch('/api/folder', {
      method: 'post',
      body: { name },
    })

    if (error) {
      return { error: error.value?.message }
    }
    return { data }
  }

  async function updateFolder({ oldName, newName }: { oldName: string; newName: string }): Promise<ModelResult> {
    const { data, error } = await useFetch('/api/folder', {
      method: 'put',
      body: { oldName, newName },
    })

    if (error) {
      return { error: error.value?.message }
    }
    return { data }
  }

  async function deleteFolder({ name }: { name: string }): Promise<ModelResult> {
    const { data, error } = await useFetch('/api/folder', {
      method: 'delete',
      body: { name },
    })

    if (error) {
      return { error: error.value?.message }
    }
    return { data }
  }

  return { createFolder, updateFolder, deleteFolder }
}
