#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { createLayersIfNotExists } from './createLayers.js'
import { createFiles } from './createFiles.js'

const { argv: { componentName } } = yargs(hideBin(process.argv))
  .command('skeleton', 'create project skeleton', (builder) => {
    return builder
      .option('component-name', {
        alias: 'c',
        type: 'string',
        description: 'component name'
      })
      .example('skeleton --component-name product', 'creates project with a single domain')
      .example('skeleton -c product -c person -c colors', 'creates project with a list of domain')
  })
  .epilog('copyright 2024 - Rodrigo Matos Corporation')

const env = process.env.NODE_ENV
const defaultMainFolder = env === 'dev' ? 'tmp' : 'src'

const layers = ['service', 'factory', 'repository'].sort()
const config = {
  layers,
  defaultMainFolder,
  mainPath: '.',
}

await createLayersIfNotExists(config)

const pendingPromisses = []
for (const domain of componentName) {
  pendingPromisses.push(createFiles({ ...config, componentName: domain }))
}
await Promise.all(pendingPromisses)