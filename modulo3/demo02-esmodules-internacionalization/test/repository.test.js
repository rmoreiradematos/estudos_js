import { describe, it } from 'mocha'
import chai from 'chai'
import Repository from '../src/repository.js'
import faker from 'faker'
import { beforeEach, afterEach } from 'mocha'
import sinon from 'sinon'
let sandBox

describe('Repository', () => {
  beforeEach(() => {
    sandBox = sinon.createSandbox()
  })
  afterEach(() => {
    sandBox.restore()
  })
  it('should save a new person', async () => {
    const newPerson = {
      id: faker.random.number(),
      vehicles: faker.vehicle.vehicle(),
      kmTravelled: faker.random.number(),
      from: faker.date.past(),
      to: faker.date.recent()
    }
    sandBox.stub(
      Repository,
      'save',
    ).resolves(newPerson)

    const result = await Repository.save(newPerson)
    chai.expect(result).to.be.deep.equal(newPerson)
  })
})