import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import fs from 'fs/promises'
import Character from '../../src/entities/characters.js'
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA.js'
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAAdapter.js'
import axios from 'axios'
describe('#RickAndMortyUSAAdapter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('#getCharacters should return characters from RickAndMortyUSA', async () => {
    const brlIntegration = jest.spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharactersFromXML.name).mockResolvedValue([])
    const result = await RickAndMortyUSAAdapter.getCharacters()
    expect(brlIntegration).toHaveBeenCalled()
    expect(result).toEqual([])
  })
})