import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import fs from 'fs/promises'
import Character from '../../src/entities/characters.js'
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL.js'
import axios from 'axios'
import RickAndMortyBRLAdapter from '../../src/business/adapters/rickAndMortyBRLAdapter.js'
describe('#RickAndMortyBRLAdapter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('#getCharacters should return characters from RickAndMortyBRL', async () => {
    const brlIntegration = jest.spyOn(RickAndMortyBRL, RickAndMortyBRL.getCharactersFromJSON.name).mockResolvedValue([])
    const result = await RickAndMortyBRLAdapter.getCharacters()
    expect(brlIntegration).toHaveBeenCalled()
    expect(result).toEqual([])
  })
})