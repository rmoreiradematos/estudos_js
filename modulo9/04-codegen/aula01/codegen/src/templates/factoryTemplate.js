import Util from "../util"

const serviceNameAnchor = '$$serviceName'
const repositoryNameAnchor = '$$repositoryName'

const serviceNameAnchorDep = '$$serviceNameDep'
const repositoryNameAnchorDep = '$$repositoryNameDep'

const componentNameAnchor = '$$componentName'
const template = `
import $$serviceName from "../service/$$serviceNameDep.js"
import $$repositoryName from "../service/$$repositoryNameDep.js"

export default class $$componentNameFactory {
  static getInstance() {
    const repository = new $$repositoryName()
    const service = new $$serviceName({repository})
    return service
  }
}`

export function factoryTemplate(componentName, repositoryName, serviceName) {
  const currentContext = `this.${repositoryName}`
  const txtFile = template
    .replaceAll(componentNameAnchor, Util.uppercaseFirstLetter(componentName))

    .replaceAll(serviceNameAnchorDep, Util.lowercaseFirstLetter(serviceName))
    .replaceAll(repositoryNameAnchorDep, Util.lowercaseFirstLetter(repositoryName))

    .replaceAll(serviceNameAnchor, Util.uppercaseFirstLetter(serviceName))
    .replaceAll(repositoryNameAnchor, Util.uppercaseFirstLetter(repositoryName))

  return {
    fileName: `${componentName}Factory`,
    template: txtFile
  }
}