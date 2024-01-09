import {
  expect,
  describe,
  test,
  jest,
  beforeEach,
  beforeAll,
  afterAll
} from "@jest/globals"

import { tmpdir } from 'os'
import fsPromises from 'fs/promises'
import { join } from 'path'
import { createLayersIfNotExists } from '../../src/createLayers.js'
import { createFiles } from '../../src/createFiles.js'
import Util from "../../src/util.js"

function getAllFunctionFromInstance(instance) {
  return Object.getOwnPropertyNames(instance)
    .filter(method => method !== 'constructor')
}

describe('#Integration - Layers- Folders Structure', () => {
  const config = {
    mainPath: '',
    defaultMainFolder: 'src',
    layers: ['service', 'factory', 'repository'].sort(),
    componentName: 'heroes'
  }
  const packageJSON = 'package.json'
  const packageJSONLocation = join('./test/integration/mocks', packageJSON)

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'layers-'))
    await fsPromises.copyFile(packageJSONLocation, join(config.mainPath, packageJSON))
    await createLayersIfNotExists(config)
  })

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true })
  })

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })
  test('Repository class should have create, find, update and delete methods', async () => {
    const myConfig = {
      ...config,
      layers: ['repository']
    }
    await createFiles(myConfig)
    const [repositoryFile] = await generateFilePath(myConfig)
    const { default: Repository } = await import(repositoryFile)
    const instance = new Repository()
    const expectedNotImplemented = fn => expect(() => fn.call().rejects("method not implemented"))
    expectedNotImplemented(instance.create)
    expectedNotImplemented(instance.find)
    expectedNotImplemented(instance.update)
    expectedNotImplemented(instance.delete)
  })
  test('Service should have the same signature of repository and call all its methods', async () => {
    const myConfig = {
      ...config,
      layers: ['repository', 'service']
    }
    await createFiles(myConfig)
    const [repositoryFile] = await generateFilePath(myConfig)
    const { default: Repository } = await import(repositoryFile)
    const { default: Service } = await import(repositoryFile)
    const repository = new Repository()
    const service = new Service({ repository })

    const allRepositoryMethods = getAllFunctionFromInstance(repository)
    allRepositoryMethods
      .forEach(method => {
        jest.spyOn(repository, method).mockResolvedValue()
      })
    const allServiceMethods = getAllFunctionFromInstance(service)

    // executa todos os métodos do service
    allServiceMethods
      .forEach(method => service[method].call(service, []))

    allRepositoryMethods
      .forEach(method => {
        expect(repository[method]).toHaveBeenCalled()
      })

  })
  test('Factory instance should match layers', async () => {
    const myConfig = {
      ...config
    }

    await createFiles(myConfig)
    const [factoryFile, repositoryFile, serviceFile] = await generateFilePath(myConfig)

    const { default: Factory } = await import(factoryFile)
    const { default: Repository } = await import(repositoryFile)
    const { default: Service } = await import(serviceFile)

    const expectedInstance = new Service({ repository: new Repository() })
    const instance = Factory.getInstance()

    expect(instance).toMatchObject(expectedInstance)
    expect(instance).toBeInstanceOf(Service)
  })

})

async function generateFilePath({ mainPath, defaultMainFolder, layers, componentName }) {
  return layers
    .map(layer => {
      const fileName = `${componentName}${Util.uppercaseFirstLetter(layer)}.js`
      return join(mainPath, defaultMainFolder, layer, fileName)
    })
}