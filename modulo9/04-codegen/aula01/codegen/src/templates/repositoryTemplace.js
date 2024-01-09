const componentNameAnchor = '$$componentName'
import Util from '../util.js'
const template = `
export class $$componentNameRepository {
  constructor() { }

  async find(data) {
    return Promise.reject('Method not implemented')
  }

  async create(data) {
    return Promise.reject('Method not implemented')
  }

  async update(id, data) {
    return Promise.reject('Method not implemented')
  }

  async delete(id) {
    return Promise.reject('Method not implemented')
  }
}
`

export function repositoryTemplate(componentName) {
  return {
    fileName: `${componentName}Repository`,
    template: template.replace(componentNameAnchor, Util.uppercaseFirstLetter(componentName))
  }
}