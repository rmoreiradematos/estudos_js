const { readFile } = require('fs/promises')
const { error } = require('./constants')
const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"]
}
class File {
  static async csvToJSON(filePath) {
    const content = await readFile(filePath, "utf-8")
    const validation = this.isValid(content)
    if (!validation.valid) throw new Error(validation.error)
    const result = this.parseCSVToJSON(content)
    return result
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...fileWithoutHeader] = csvString.split(/\r?\n/)
    const isValidHeaders = header === options.fields.join(",")
    if (!isValidHeaders)
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    if (
      !fileWithoutHeader.length ||
      fileWithoutHeader.length > options.maxLines
    )
      return {
        error: error.FILE_ERROR_LENGTH_MESSAGE,
        valid: false
      }
    return { valid: true }
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split(/\r?\n/)
    const firstLine = lines.shift()
    const header = firstLine.split(",")
    const users = lines.map((line) => {
      const user = {}
      const columns = line.split(",")
      for (const index in columns) {
        user[header[index]] = columns[index].trim()
      }
      return user
    })
    return users
  }
}


module.exports = File;