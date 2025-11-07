import { z } from 'zod'

export function schemaFolder() {
  const schema = z.object({
    name: z.string({ message: 'Required' }).refine((val) => val === val.toLowerCase(), {
      message: 'Folder names must consist entirely of lowercase letters',
    }),
  })

  return { schema }
}
