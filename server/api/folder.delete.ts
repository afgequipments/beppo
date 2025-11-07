import { defineEventHandler, readBody } from 'h3'
import path from 'path'
import fs from 'fs/promises'

// get absolut path from '/content' folder
const contentRoot = path.resolve(process.cwd(), 'content')

export default defineEventHandler(async (event) => {
  const { name } = await readBody(event)

  // check value name
  if (!name) {
    return { error: 'name is empty' }
  }

  const targetPath = path.join(contentRoot, name)

  try {
    // delete folder and all file inside
    await fs.rm(targetPath, { recursive: true, force: true })

    return {
      data: `folder ${name} deleted`,
    }
  } catch (e) {
    return { error: `${e}` }
  }
})
