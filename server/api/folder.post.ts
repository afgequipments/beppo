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
  const navFilePath = path.join(targetPath, '.navigation.yml')
  const indexFilePath = path.join(targetPath, 'index.md')

  // set title inside navigation.yml
  const yamlContent = `title: ${name}\nicon: false\n`

  try {
    // create new folder
    await fs.mkdir(targetPath, { recursive: true })

    // create file .navigation.yml
    await fs.writeFile(navFilePath, yamlContent)

    // create file index.md
    await fs.writeFile(indexFilePath, '')

    return {
      data: `folder ${name} created`,
    }
  } catch (e) {
    return { error: `${e}` }
  }
})
