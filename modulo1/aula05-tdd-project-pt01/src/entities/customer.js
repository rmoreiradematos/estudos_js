const Base = require('./base/base')
class Customer extends Base {
  constructor({ id, name, carIds, price }) {
    super({ id, name })
    this.carIds = carIds
    this.price = price
  }
}

module.exports = Customer