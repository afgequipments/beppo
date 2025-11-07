import { defineEventHandler, readBody } from 'h3'
import path from 'path'
import fs from 'fs/promises'

// get absolut path from '/content' folder
const contentRoot = path.resolve(process.cwd(), 'content')

export default defineEventHandler(async (event) => {
  const { oldName, newName } = await readBody(event)

  // check value ondName and newName
  if (!oldName || !newName) {
    return { error: 'oldName / newName empty' }
  }

  const oldPath = path.join(contentRoot, oldName)
  const newPath = path.join(contentRoot, newName)

  try {
    // rename folder
    await fs.rename(oldPath, newPath)

    const navFilePath = path.join(newPath, '.navigation.yml')

    let content = await fs.readFile(navFilePath, 'utf-8')
    // change title
    content = content.replace(/^title:.*$/m, `title: ${newName}`)

    await fs.writeFile(navFilePath, content)

    return {
      data: 'folder name already updated',
    }
  } catch (e) {
    return { error: `${e}` }
  }
})
