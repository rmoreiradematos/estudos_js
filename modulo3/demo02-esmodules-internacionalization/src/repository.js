import { writeFile, readFile } from 'fs/promises'

export default class Repository {
  static async save(data) {
    const databaseFile = new URL('../database.json', import.meta.url).pathname

    let currentData = []
    try {
      const fileContents = await readFile(databaseFile, 'utf-8')
      currentData = JSON.parse(fileContents)
    } catch (error) {
      console.error(`Error reading the file: ${error}`)
    }

    currentData.push(data)
    await writeFile(databaseFile, JSON.stringify(currentData))
  }
}
