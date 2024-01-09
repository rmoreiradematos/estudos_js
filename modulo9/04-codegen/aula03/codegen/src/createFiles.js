import fsPromises from 'fs/promises'
import fs from 'fs'
import templates from './templates/index.js'
import Util from './util.js'

const defaultDependencies = (layer, componentName) => {
  const dependencies = {
    repository: [],
    service: [`${componentName}Repository`],
    factory: [`${componentName}Repository`, `${componentName}Service`]
  }
  return dependencies[layer].map(Util.lowercaseFirstLetter)
}
async function executeWrites(pendingFileToWrite) {
  return Promise.all(pendingFileToWrite
    .map(
      ({ fileName, txtFile }) => fsPromises.writeFile(fileName, txtFile)
    ))
}
export async function createFiles({ mainPath, defaultMainFolder, layers, componentName }) {
  const keys = Object.keys(templates)
  const pendingFileToWrite = []
  for (const layer of layers) {
    const chosenTEmplate = keys.find(key => key.includes(layer))
    if (!chosenTEmplate) return { error: "the chosen layer doesn't have a template" }
    const template = templates[chosenTEmplate]
    // /Users/Document/jsexpert/codegen/src/factory
    const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`
    const dependencies = defaultDependencies(layer, componentName)
    const { fileName: file, template: txtFile } = template(componentName, ...dependencies)
    // /Users/Document/jsexpert/codegen/src/factory/heroesFactory.js

    const fileName = `${targetFolder}/${Util.lowercaseFirstLetter(file)}.js`
    pendingFileToWrite.push({ fileName, txtFile })
  }
  await executeWrites(pendingFileToWrite)
  return { success: true }
}