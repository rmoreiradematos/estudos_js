import BaseBusiness from "./base/baseBusiness.js"

export default class OrderBusiness extends BaseBusiness {
  #order = new Set()
  _validateRequiredFields(data) {
    return !!data.amout && !!data.products.length
  }

  _create(data) {
    this.#order.add(data)
    return data
  }
}