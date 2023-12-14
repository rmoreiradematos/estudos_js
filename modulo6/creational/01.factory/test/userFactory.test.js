const rewiremock = require('rewiremock/node')
const { deepStrictEqual } = require('assert')
// poderia estar em outro arquivo
const dbData = [{
  name: 'John Doe'
}, { name: 'Jane Doe' }]

class MockDatabse {
  connect = () => this
  find = async (query) => dbData
}
rewiremock(() => require('../src/util/database')).with(MockDatabse);

; (async () => {
  {
    const expected = [{ name: 'JOHN DOE' }, { name: 'JANE DOE' }]
    rewiremock.enable()
    const UserFactory = require('../src/factory/userFactory')
    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find()
    deepStrictEqual(result, expected)
    rewiremock.disable()
  }
  {
    const expected = [{ name: 'JOHN DOE' }]
    const UserFactory = require('../src/factory/userFactory')
    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find()
    deepStrictEqual(result, expected)
  }
})()