const Service = require('./service')
const assert = require('assert')
const BASE_URL1 = "https://swapi.dev/api/planets/1/"
const BASE_URL2 = "https://swapi.dev/api/planets/2/"
const { createSandbox } = require('sinon')
const sinon = createSandbox()
const mocks = {
  alderaan: require('../mocks/alderaan.json'),
  tatooine: require('../mocks/tatooine.json')
};
; (async () => {
  // {
  //   //vai para a internet
  //   const service = new Service()
  //   const dados = await service.makeRequest(BASE_URL2)
  //   console.log('dados', JSON.stringify(dados))
  // }
  const service = new Service()
  const stub = sinon.stub(
    service,
    service.makeRequest.name
  )
  stub
    .withArgs(BASE_URL1)
    .resolves(mocks.tatooine)
  stub
    .withArgs(BASE_URL2)
    .resolves(mocks.alderaan)
  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearedIn: 5
    }
    const results = await service.getPlanets(BASE_URL1)
    assert.deepStrictEqual(results, expected)
  }
  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearedIn: 2
    }
    const results = await service.getPlanets(BASE_URL2)
    assert.deepStrictEqual(results, expected)
  }
})()